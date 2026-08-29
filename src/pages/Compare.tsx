import {
  ArrowLeft,
  BadgePercent,
  Check,
  ChevronDown,
  Clock,
  Loader2,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreBadgeRow } from '../components/StoreBadge'
import type { Chain } from '../data/stores'
import {
  buildTripSuggestions,
  dealFor,
  fancySaving,
  guaranteedDealFor,
  type CompareSettings,
  type ItemDeal,
  type TripSuggestion,
} from '../lib/compare'
import { formatCurrency } from '../lib/format'
import { useApp } from '../store/useApp'

function tripChains(trip: TripSuggestion) {
  return trip.plans.map((plan) => plan.store.chain)
}

function ViewDetailsToggle({
  open,
  onToggle,
}: {
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      aria-expanded={open}
      className="mt-2 flex w-full items-center justify-center gap-1 py-1 text-[13px] font-semibold text-forest"
      onClick={onToggle}
      type="button"
    >
      {open ? 'Hide item details' : 'View item details'}
      <ChevronDown
        aria-hidden="true"
        className={open ? 'rotate-180' : ''}
        size={14}
        strokeWidth={2}
      />
    </button>
  )
}

function TripItemsPanel({
  trip,
  minDeals = 0,
}: {
  trip: TripSuggestion
  minDeals?: number
}) {
  const shopCart = useApp((state) => state.shopCart)

  const placement = new Map<
    string,
    { chain: Chain; unitPrice: number; storeName: string }
  >()
  for (const plan of trip.plans) {
    for (const entry of plan.lines) {
      placement.set(entry.line.id, {
        chain: plan.store.chain,
        unitPrice: entry.unitPrice,
        storeName: plan.store.name,
      })
    }
  }

  const deals = new Map<string, ItemDeal>()
  for (const line of shopCart) {
    const place = placement.get(line.id)
    const deal = place ? dealFor(line.id, place.chain) : null
    if (deal) deals.set(line.id, deal)
  }
  // Guarantee the headline trip always shows a few specials.
  for (const line of shopCart) {
    if (deals.size >= minDeals) break
    const place = placement.get(line.id)
    if (place && !deals.has(line.id)) {
      deals.set(line.id, guaranteedDealFor(line.id, place.chain))
    }
  }

  const dealCount = deals.size

  return (
    <div className="mt-3 rounded-xl border border-rule bg-sunk p-3">
      <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-mute">
        Your items{dealCount > 0 ? ` · ${dealCount} on special` : ''}
      </p>
      <ul className="mt-2 divide-y divide-rule">
        {shopCart.map((line) => {
          const place = placement.get(line.id)
          const deal = deals.get(line.id) ?? null
          const now = (place?.unitPrice ?? 0) * line.qty
          const was = deal ? now / (1 - deal.fraction) : null
          return (
            <li key={line.id} className="flex items-center gap-2 py-2">
              <span aria-hidden="true" className="text-lg">
                {line.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold">
                  {line.name}
                  {line.qty > 1 && (
                    <span className="text-mute"> ×{line.qty}</span>
                  )}
                </span>
                {place && (
                  <span className="block text-[11px] text-mute">
                    {place.storeName}
                  </span>
                )}
              </span>
              {deal && (
                <span className="shrink-0 rounded-full bg-lime px-2 py-0.5 text-[11px] font-bold text-ink">
                  {deal.label}
                </span>
              )}
              <span className="tnum shrink-0 whitespace-nowrap text-right text-[13px]">
                {was ? (
                  <>
                    <span className="text-mute line-through">
                      {formatCurrency(was)}
                    </span>{' '}
                    <span className="font-bold text-red-600">
                      {formatCurrency(now)}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">{formatCurrency(now)}</span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="mt-2 text-[11px] text-mute">
        Specials shown are illustrative.
      </p>
    </div>
  )
}

function TripDetails({ trip }: { trip: TripSuggestion }) {
  return (
    <div className="mt-3 space-y-3">
      <dl className="tnum space-y-2 text-[15px]">
        <div className="flex justify-between gap-4">
          <dt className="text-mute">Groceries</dt>
          <dd className="font-semibold">{formatCurrency(trip.groceries)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-mute">Travel cost (fuel)</dt>
          <dd className="font-semibold">{formatCurrency(trip.travelCost)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-rule pt-2">
          <dt className="font-semibold">Total cost</dt>
          <dd className="text-base font-bold">{formatCurrency(trip.total)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="flex items-center gap-1 text-mute">
            <Clock aria-hidden="true" size={15} strokeWidth={1.75} />
            Travel time
          </dt>
          <dd className="font-semibold">{trip.travelMinutes} min round trip</dd>
        </div>
      </dl>

      {trip.plans.length > 1 && (
        <div className="rounded-xl bg-sunk p-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-mute">
            Split across stores
          </p>
          <ul className="mt-2 space-y-1.5">
            {trip.plans.map((plan) => (
              <li
                key={plan.store.id}
                className="tnum flex justify-between gap-4 text-[13px]"
              >
                <span>
                  {plan.store.name}
                  <span className="text-mute">
                    {' '}
                    · {plan.lines.length} item
                    {plan.lines.length === 1 ? '' : 's'}
                  </span>
                </span>
                <span className="font-semibold">
                  {formatCurrency(plan.subtotal)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export function Compare() {
  const navigate = useNavigate()
  const shopCart = useApp((state) => state.shopCart)
  const optimiseMode = useApp((state) => state.optimiseMode)
  const transport = useApp((state) => state.transport)
  const litresPer100km = useApp((state) => state.litresPer100km)
  const timeValuePerHour = useApp((state) => state.timeValuePerHour)
  const maxDistanceKm = useApp((state) => state.maxDistanceKm)
  const maxStores = useApp((state) => state.maxStores)
  const saveTrip = useApp((state) => state.saveTrip)

  const settings = useMemo<CompareSettings>(
    () => ({
      mode: optimiseMode,
      transport,
      litresPer100km,
      timeValuePerHour,
      maxDistanceKm,
      maxStores,
    }),
    [
      optimiseMode,
      transport,
      litresPer100km,
      timeValuePerHour,
      maxDistanceKm,
      maxStores,
    ],
  )

  const trips = useMemo(
    () => buildTripSuggestions(shopCart, settings),
    [shopCart, settings],
  )

  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [itemsOpen, setItemsOpen] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1800)
    return () => window.clearTimeout(timer)
  }, [])

  const best = trips[0]
  const topSaved = best ? fancySaving(shopCart, settings, best.total) : 0
  const selectedTrip = trips.find((trip) => trip.id === selectedId) ?? best

  function handleSave() {
    if (!selectedTrip) return
    const itemCount = shopCart.reduce((total, line) => total + line.qty, 0)
    saveTrip({
      id: `${selectedTrip.id}-${Date.now()}`,
      savedAt: new Date().toISOString(),
      mode: optimiseMode,
      itemCount,
      stores: selectedTrip.plans.map((plan) => ({
        name: plan.store.name,
        chain: plan.store.chain,
      })),
      groceries: selectedTrip.groceries,
      travelCost: selectedTrip.travelCost,
      total: selectedTrip.total,
      travelMinutes: selectedTrip.travelMinutes,
      saved: fancySaving(shopCart, settings, selectedTrip.total),
    })
    navigate('/cart')
  }

  return (
    <div className="flex min-h-full flex-col bg-sunk">
      <div className="flex-1 px-4 pb-6 pt-7">
        <button
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-rule bg-paper"
          onClick={() => navigate('/shop')}
          type="button"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>

        {loading ? (
          <div className="mt-24 flex flex-col items-center text-center">
            <Loader2
              aria-hidden="true"
              className="animate-spin text-forest motion-reduce:animate-none"
              size={34}
              strokeWidth={2}
            />
            <p className="mt-4 text-[15px] font-semibold">
              Comparing prices across stores…
            </p>
            <p className="mt-1 text-[13px] text-mute">
              Checking fuel, distance and shelf prices.
            </p>
          </div>
        ) : !best ? (
          <div className="mt-16 text-center">
            <p className="text-[15px] font-semibold">No trips to show</p>
            <p className="mt-1 text-[13px] text-mute">
              Add items to your list, then compare again.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-5 rounded-2xl bg-forest px-5 py-4 text-paper">
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-paper/70">
                Money saved with the best trip
              </p>
              <p className="tnum mt-1 text-3xl font-bold">
                {formatCurrency(topSaved)}
              </p>
              <p className="mt-1 text-[13px] text-paper/80">
                vs buying the same list at Coles / Woolworths average
              </p>
            </div>

            {/* Best trip, shown in full */}
            <TripOption
              onSelect={() => setSelectedId(best.id)}
              rank={1}
              selected={selectedTrip?.id === best.id}
              trip={best}
            />

            {/* Runners up, collapsed */}
            <div className="mt-3 space-y-2">
              {trips.slice(1).map((trip, index) => {
                const isOpen = expanded === trip.id
                return (
                  <div
                    key={trip.id}
                    className={[
                      'rounded-2xl border bg-paper',
                      selectedTrip?.id === trip.id
                        ? 'border-forest'
                        : 'border-rule',
                    ].join(' ')}
                  >
                    <button
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 p-4 text-left"
                      onClick={() =>
                        setExpanded((current) =>
                          current === trip.id ? null : trip.id,
                        )
                      }
                      type="button"
                    >
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-mute">
                          Option {index + 2}
                        </span>
                        <span className="block truncate text-[15px] font-semibold">
                          {trip.title}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="tnum text-[15px] font-bold">
                          {formatCurrency(trip.total)}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={isOpen ? 'rotate-180' : ''}
                          size={18}
                          strokeWidth={2}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="border-t border-rule p-4">
                        <StoreBadgeRow chains={tripChains(trip)} size="sm" />
                        <TripDetails trip={trip} />
                        <button
                          className={[
                            'mt-3 min-h-11 w-full rounded-xl border px-4 py-2.5 text-[15px] font-bold',
                            selectedTrip?.id === trip.id
                              ? 'border-forest bg-forest text-paper'
                              : 'border-forest bg-paper text-forest',
                          ].join(' ')}
                          onClick={() => setSelectedId(trip.id)}
                          type="button"
                        >
                          {selectedTrip?.id === trip.id
                            ? 'Selected'
                            : 'Select this trip'}
                        </button>
                        <ViewDetailsToggle
                          open={itemsOpen === trip.id}
                          onToggle={() =>
                            setItemsOpen((current) =>
                              current === trip.id ? null : trip.id,
                            )
                          }
                        />
                        {itemsOpen === trip.id && <TripItemsPanel trip={trip} />}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <p className="mt-5 text-[12px] text-mute">
              Estimates use hardcoded Brisbane shelf prices and a {' '}
              {formatCurrency(1.85)}/L fuel price.
            </p>
          </>
        )}
      </div>

      {!loading && best && (
        <div className="sticky bottom-0 border-t border-rule bg-paper px-4 py-3">
          <button
            className="min-h-12 w-full rounded-xl border border-forest bg-forest px-5 py-3 text-base font-bold text-paper disabled:opacity-40"
            disabled={!selectedTrip}
            onClick={handleSave}
            type="button"
          >
            Save trip to cart
          </button>
        </div>
      )}
    </div>
  )
}

function TripOption({
  trip,
  rank,
  selected,
  onSelect,
}: {
  trip: TripSuggestion
  rank: number
  selected: boolean
  onSelect: () => void
}) {
  const [showItems, setShowItems] = useState(false)

  return (
    <div
      className={[
        'mt-3 rounded-2xl border bg-paper p-4',
        selected ? 'border-forest ring-1 ring-forest' : 'border-rule',
      ].join(' ')}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-3 py-1 text-[12px] font-bold text-ink">
          <BadgePercent aria-hidden="true" size={14} strokeWidth={2.25} />
          Hot deals
        </span>
        <span className="text-[13px] font-semibold text-mute">#{rank}</span>
      </div>

      <p className="mt-3 text-[17px] font-bold">{trip.title}</p>
      <div className="mt-2">
        <StoreBadgeRow chains={trip.plans.map((plan) => plan.store.chain)} />
      </div>

      <TripDetails trip={trip} />

      <button
        className={[
          'mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-[15px] font-bold',
          selected
            ? 'border-forest bg-forest text-paper'
            : 'border-forest bg-paper text-forest',
        ].join(' ')}
        onClick={onSelect}
        type="button"
      >
        {selected && <Check aria-hidden="true" size={16} strokeWidth={2.5} />}
        {selected ? 'Selected' : 'Select this trip'}
      </button>

      <ViewDetailsToggle
        open={showItems}
        onToggle={() => setShowItems((current) => !current)}
      />
      {showItems && <TripItemsPanel minDeals={2} trip={trip} />}
    </div>
  )
}
