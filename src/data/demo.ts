import { getBenchmarkPrice, getProductById } from './products'
import { getStoreById } from './stores'

export const demoSavings = {
  allTimeSaved: 142.6,
  equivalenceLine: "That's 7.5 jugs of milk",
  thisMonthSaved: 38.4,
  thisMonthSpent: 186.2,
  lastTripSaved: 12.4,
  goal: { name: 'Weekend away', target: 180, current: 47 },
}

export type DemoTrip = {
  id: string
  date: string
  storeId: string
  itemCount: number
  spend: number
  savings: number
}

export const demoTrips: DemoTrip[] = [
  {
    id: 'trip-1',
    date: '2026-08-24',
    storeId: 'aldi-indooroopilly',
    itemCount: 8,
    spend: 54.2,
    savings: 12.4,
  },
  {
    id: 'trip-2',
    date: '2026-08-17',
    storeId: 'iga-st-lucia',
    itemCount: 5,
    spend: 31.8,
    savings: 4.6,
  },
  {
    id: 'trip-3',
    date: '2026-08-10',
    storeId: 'yuens-sunnybank',
    itemCount: 12,
    spend: 78.5,
    savings: 21.3,
  },
  {
    id: 'trip-4',
    date: '2026-08-03',
    storeId: 'aldi-indooroopilly',
    itemCount: 7,
    spend: 48.9,
    savings: 9.8,
  },
]

export type DemoPromo = {
  id: string
  storeName: string
  title: string
  detail: string
  distanceKm: number
}

export const demoPromos: DemoPromo[] = [
  {
    id: 'promo-1',
    storeName: 'ALDI Indooroopilly',
    title: 'Fresh produce special',
    detail: 'Bananas 1kg $3.49',
    distanceKm: 3.5,
  },
  {
    id: 'promo-2',
    storeName: 'IGA St Lucia',
    title: 'Local milk deal',
    detail: 'Full cream milk 2L $3.90',
    distanceKm: 0.9,
  },
  {
    id: 'promo-3',
    storeName: "Yuen's Market",
    title: 'Asian greens bundle',
    detail: 'Bok choy 2 for $3.00',
    distanceKm: 13.8,
  },
]

export type FavoriteItem = {
  id: string
  productId: string
  note?: string
}

export type FavoriteIngredient = {
  id: string
  name: string
  typicalUnit: string
}

export type SavedTrip = {
  id: string
  name: string
  itemCount: number
  estimatedBenchmark: number
}

export const demoFavoriteItems: FavoriteItem[] = [
  { id: 'fav-1', productId: 'milk-3l' },
  { id: 'fav-2', productId: 'eggs-12' },
  { id: 'fav-3', productId: 'rice-5kg' },
]

export const demoFavoriteIngredients: FavoriteIngredient[] = [
  { id: 'ing-1', name: 'Garlic', typicalUnit: '3 bulbs' },
  { id: 'ing-2', name: 'Ginger', typicalUnit: '100g' },
  { id: 'ing-3', name: 'Spring onions', typicalUnit: 'bunch' },
  { id: 'ing-4', name: 'Coriander', typicalUnit: 'bunch' },
]

export const demoSavedTrips: SavedTrip[] = [
  {
    id: 'saved-1',
    name: 'Weekly staples',
    itemCount: 8,
    estimatedBenchmark: 62.4,
  },
  {
    id: 'saved-2',
    name: 'Stir fry night',
    itemCount: 6,
    estimatedBenchmark: 34.8,
  },
  {
    id: 'saved-3',
    name: 'Big shop',
    itemCount: 14,
    estimatedBenchmark: 118.2,
  },
]

export type BasketLine = {
  productId: string
  qty: number
}

export const demoBasketLines: BasketLine[] = [
  { productId: 'milk-3l', qty: 1 },
  { productId: 'bread-loaf', qty: 1 },
  { productId: 'eggs-12', qty: 1 },
  { productId: 'bananas-1kg', qty: 2 },
  { productId: 'chicken-1kg', qty: 1 },
  { productId: 'rice-5kg', qty: 1 },
]

export function getBasketBenchmarkTotal(lines: BasketLine[]): number {
  return lines.reduce((total, line) => {
    const product = getProductById(line.productId)
    if (!product) return total
    return total + getBenchmarkPrice(product) * line.qty
  }, 0)
}

export type ResultQuote = {
  storeId: string
  total: number
  savings: number
  distanceKm: number
  roundTripMinutes: number
  travelCost: number
  missingItems: number
  delta?: number
  deltaLabel?: string
}

export const demoResultQuotes: ResultQuote[] = [
  {
    storeId: 'aldi-indooroopilly',
    total: 58.4,
    savings: 14.2,
    distanceKm: 3.5,
    roundTripMinutes: 30,
    travelCost: 2.1,
    missingItems: 0,
  },
  {
    storeId: 'iga-st-lucia',
    total: 64.8,
    savings: 7.8,
    distanceKm: 0.9,
    roundTripMinutes: 20,
    travelCost: 1.2,
    missingItems: 0,
    delta: 6.4,
    deltaLabel: '+$6.40',
  },
  {
    storeId: 'woolworths-toowong',
    total: 67.2,
    savings: 5.4,
    distanceKm: 2.8,
    roundTripMinutes: 28,
    travelCost: 2.4,
    missingItems: 1,
    delta: 8.8,
    deltaLabel: '+$8.80',
  },
]

export function formatTripStoreName(storeId: string): string {
  return getStoreById(storeId)?.name ?? storeId
}
