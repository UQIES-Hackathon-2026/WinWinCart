import { catalogById, type FoodCategory } from '../data/catalog'
import { stores, type Chain, type Store } from '../data/stores'
import type { CartLine, OptimiseMode, Transport } from '../store/useApp'

const FUEL_PRICE_PER_LITRE = 1.85
const BUS_FARE_ROUND_TRIP = 1.0

export type StorePlan = {
  store: Store
  lines: { line: CartLine; unitPrice: number }[]
  subtotal: number
}

export type TripSuggestion = {
  id: string
  title: string
  plans: StorePlan[]
  groceries: number
  travelCost: number
  total: number
  travelMinutes: number
  saved: number
}

export type CompareSettings = {
  mode: OptimiseMode
  transport: Transport
  litresPer100km: number
  timeValuePerHour: number
  maxDistanceKm: number
  maxStores: number
}

function chainMultiplier(chain: Chain, category: FoodCategory): number {
  switch (chain) {
    case 'aldi':
      return 0.9
    case 'coles':
      return 1.0
    case 'woolworths':
      return 1.01
    case 'iga':
      return 1.1
    case 'independent':
      return category === 'fruits' || category === 'veggies' ? 0.82 : 0.98
  }
}

function unitPriceAt(line: CartLine, chain: Chain): number {
  const item = catalogById(line.id)
  const base = item?.basePrice ?? 3
  const category = item?.category ?? 'carbs'
  return round2(base * chainMultiplier(chain, category))
}

export function benchmarkTotal(lines: CartLine[]): number {
  return round2(
    lines.reduce(
      (total, line) => total + (catalogById(line.id)?.basePrice ?? 3) * line.qty,
      0,
    ),
  )
}

function travelCostForStore(store: Store, settings: CompareSettings): number {
  if (settings.transport === 'walk') return 0
  if (settings.transport === 'bus') return BUS_FARE_ROUND_TRIP
  return round2(
    2 *
      store.distanceKm *
      (settings.litresPer100km / 100) *
      FUEL_PRICE_PER_LITRE,
  )
}

function minutesForStore(store: Store, transport: Transport): number {
  const oneWay = transport === 'bus' ? store.busMinutes : store.driveMinutes
  return 2 * oneWay + 12
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

function eligibleStores(maxDistanceKm: number): Store[] {
  const within = stores.filter((store) => store.distanceKm <= maxDistanceKm)
  if (within.length > 0) return within
  return [...stores].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3)
}

function combinations<T>(items: T[], size: number): T[][] {
  if (size === 0) return [[]]
  if (size > items.length) return []
  const [head, ...rest] = items
  const withHead = combinations(rest, size - 1).map((combo) => [head, ...combo])
  const withoutHead = combinations(rest, size)
  return [...withHead, ...withoutHead]
}

function planForStoreSet(lines: CartLine[], storeSet: Store[]): StorePlan[] {
  const byStore = new Map<string, StorePlan>()

  for (const line of lines) {
    let bestStore: Store | null = null
    let bestPrice = Infinity
    for (const store of storeSet) {
      const price = unitPriceAt(line, store.chain)
      if (price < bestPrice) {
        bestPrice = price
        bestStore = store
      }
    }
    if (!bestStore) continue

    const plan: StorePlan = byStore.get(bestStore.id) ?? {
      store: bestStore,
      lines: [],
      subtotal: 0,
    }
    plan.lines.push({ line, unitPrice: bestPrice })
    plan.subtotal = round2(plan.subtotal + bestPrice * line.qty)
    byStore.set(bestStore.id, plan)
  }

  return [...byStore.values()].sort((a, b) => b.subtotal - a.subtotal)
}

function titleFor(plans: StorePlan[]): string {
  if (plans.length === 1) return plans[0].store.name
  return plans.map((plan) => plan.store.name).join(' + ')
}

function scoreFor(candidate: TripSuggestion, settings: CompareSettings): number {
  if (settings.mode === 'time') {
    return candidate.travelMinutes + candidate.total / 1000
  }
  if (settings.mode === 'both') {
    return (
      candidate.total +
      (candidate.travelMinutes / 60) * settings.timeValuePerHour
    )
  }
  return candidate.total
}

/**
 * A demo-friendly "money saved" figure for a chosen trip. Takes the best of a
 * few comparisons so the headline never lands on zero: against the
 * Coles/Woolworths benchmark, against the priciest reachable single store, and
 * a floor of ~14% of the benchmark.
 */
export function fancySaving(
  lines: CartLine[],
  settings: CompareSettings,
  tripTotal: number,
): number {
  if (lines.length === 0) return 0
  const benchmark = benchmarkTotal(lines)
  const pool = eligibleStores(settings.maxDistanceKm)
  const worst = pool.length
    ? Math.max(
        ...pool.map(
          (store) =>
            lines.reduce(
              (total, line) =>
                total + unitPriceAt(line, store.chain) * line.qty,
              0,
            ) + travelCostForStore(store, settings),
        ),
      )
    : benchmark
  return round2(
    Math.max(benchmark - tripTotal, worst - tripTotal, benchmark * 0.14),
  )
}

export function buildTripSuggestions(
  lines: CartLine[],
  settings: CompareSettings,
): TripSuggestion[] {
  if (lines.length === 0) return []

  const pool = eligibleStores(settings.maxDistanceKm)
  const benchmark = benchmarkTotal(lines)
  const maxStores = Math.max(1, Math.min(settings.maxStores, 3, pool.length))

  const bySignature = new Map<string, TripSuggestion>()

  for (let size = 1; size <= maxStores; size += 1) {
    for (const storeSet of combinations(pool, size)) {
      const plans = planForStoreSet(lines, storeSet)
      if (plans.length === 0) continue

      const signature = plans
        .map((plan) => plan.store.id)
        .sort()
        .join('|')
      if (bySignature.has(signature)) continue

      const groceries = round2(
        plans.reduce((total, plan) => total + plan.subtotal, 0),
      )
      const travelCost = round2(
        plans.reduce(
          (total, plan) => total + travelCostForStore(plan.store, settings),
          0,
        ),
      )
      const travelMinutes = plans.reduce(
        (total, plan) => total + minutesForStore(plan.store, settings.transport),
        0,
      )
      const total = round2(groceries + travelCost)

      bySignature.set(signature, {
        id: signature,
        title: titleFor(plans),
        plans,
        groceries,
        travelCost,
        total,
        travelMinutes,
        saved: round2(benchmark - total),
      })
    }
  }

  return [...bySignature.values()]
    .sort((a, b) => scoreFor(a, settings) - scoreFor(b, settings))
    .slice(0, 4)
}
