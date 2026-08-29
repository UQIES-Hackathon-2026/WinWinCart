import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DietNeed } from '../data/catalog'
import { demoBasketLines, demoSavings } from '../data/demo'

export type Transport = 'car' | 'bus' | 'walk'
export type OptimiseMode = 'price' | 'time' | 'both'

export type BasketItem = {
  productId: string
  qty: number
}

export type CartLine = {
  id: string
  name: string
  emoji: string
  qty: number
}

export type SavedTripPlan = {
  id: string
  savedAt: string
  mode: OptimiseMode
  itemCount: number
  stores: { name: string; chain: string }[]
  groceries: number
  travelCost: number
  total: number
  travelMinutes: number
  saved: number
}

export type SavingsTransfer = {
  id: string
  paidAt: string
  storeNames: string
  itemCount: number
  amountSpent: number
  amountSaved: number
}

export type PaymentResult =
  | 'completed'
  | 'already-paid'
  | 'insufficient-funds'
  | 'trip-not-found'
  | 'weekly-budget-used'

function roundMoney(value: number) {
  return Math.round(value * 100) / 100
}

export function calculateBudgetSavings(weeklyBudget: number, amountSpent: number) {
  if (!Number.isFinite(weeklyBudget) || !Number.isFinite(amountSpent)) return 0
  return roundMoney(Math.max(weeklyBudget - amountSpent, 0))
}

function getLocalWeekKey(date = new Date()) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const daysSinceMonday = (monday.getDay() + 6) % 7
  monday.setDate(monday.getDate() - daysSinceMonday)
  const year = monday.getFullYear()
  const month = String(monday.getMonth() + 1).padStart(2, '0')
  const day = String(monday.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

type AppState = {
  suburb: string
  transport: Transport
  litresPer100km: number
  timeValuePerHour: number
  weeklyBudget: number
  goal: { name: string; target: number; current: number }
  basket: BasketItem[]
  tripList: BasketItem[]
  optimiseMode: OptimiseMode
  shopCart: CartLine[]
  maxDistanceKm: number
  maxStores: number
  dietNeeds: DietNeed[]
  savedTrips: SavedTripPlan[]
  walletBalance: number
  savingsBalance: number
  paidTripIds: string[]
  budgetSettlementWeek: string | null
  savingsTransfers: SavingsTransfer[]
  setSuburb: (suburb: string) => void
  setTransport: (transport: Transport) => void
  setLitresPer100km: (litres: number) => void
  setTimeValuePerHour: (value: number) => void
  setWeeklyBudget: (budget: number) => void
  setGoal: (goal: { name: string; target: number; current: number }) => void
  setOptimiseMode: (mode: OptimiseMode) => void
  setBasketQty: (productId: string, qty: number) => void
  addToTripList: (productId: string) => void
  removeFromTripList: (productId: string) => void
  setTripListQty: (productId: string, qty: number) => void
  addCartItem: (item: { id: string; name: string; emoji: string }) => void
  setCartQty: (id: string, qty: number) => void
  removeCartItem: (id: string) => void
  clearShopCart: () => void
  setMaxDistanceKm: (km: number) => void
  setMaxStores: (count: number) => void
  toggleDietNeed: (need: DietNeed) => void
  saveTrip: (trip: SavedTripPlan) => void
  removeSavedTrip: (id: string) => void
  topUpWallet: (amount: number) => void
  completeTripPayment: (tripId: string) => PaymentResult
  resetDemo: () => void
}

const defaultState = {
  suburb: 'St Lucia 4067',
  transport: 'car' as Transport,
  litresPer100km: 8,
  timeValuePerHour: 22,
  weeklyBudget: 100,
  goal: { ...demoSavings.goal, name: 'AC/DC Concert', current: 0 },
  basket: demoBasketLines,
  tripList: [] as BasketItem[],
  optimiseMode: 'both' as OptimiseMode,
  shopCart: [] as CartLine[],
  maxDistanceKm: 8,
  maxStores: 3,
  dietNeeds: [] as DietNeed[],
  savedTrips: [] as SavedTripPlan[],
  walletBalance: 426.8,
  savingsBalance: 0,
  paidTripIds: [] as string[],
  budgetSettlementWeek: null as string | null,
  savingsTransfers: [] as SavingsTransfer[],
}

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setSuburb: (suburb) => set({ suburb }),
      setTransport: (transport) => set({ transport }),
      setLitresPer100km: (litresPer100km) => set({ litresPer100km }),
      setTimeValuePerHour: (timeValuePerHour) => set({ timeValuePerHour }),
      setWeeklyBudget: (weeklyBudget) => set({ weeklyBudget }),
      setGoal: (goal) => set({ goal }),
      setOptimiseMode: (optimiseMode) => set({ optimiseMode }),
      setBasketQty: (productId, qty) =>
        set((state) => ({
          basket:
            qty <= 0
              ? state.basket.filter((item) => item.productId !== productId)
              : state.basket.some((item) => item.productId === productId)
                ? state.basket.map((item) =>
                    item.productId === productId ? { ...item, qty } : item,
                  )
                : [...state.basket, { productId, qty }],
        })),
      addToTripList: (productId) =>
        set((state) => {
          const existing = state.tripList.find(
            (item) => item.productId === productId,
          )
          if (existing) {
            return {
              tripList: state.tripList.map((item) =>
                item.productId === productId
                  ? { ...item, qty: item.qty + 1 }
                  : item,
              ),
            }
          }
          return { tripList: [...state.tripList, { productId, qty: 1 }] }
        }),
      removeFromTripList: (productId) =>
        set((state) => ({
          tripList: state.tripList.filter(
            (item) => item.productId !== productId,
          ),
        })),
      setTripListQty: (productId, qty) =>
        set((state) => ({
          tripList:
            qty <= 0
              ? state.tripList.filter((item) => item.productId !== productId)
              : state.tripList.map((item) =>
                  item.productId === productId ? { ...item, qty } : item,
                ),
        })),
      addCartItem: (item) =>
        set((state) => {
          const existing = state.shopCart.find((line) => line.id === item.id)
          if (existing) {
            return {
              shopCart: state.shopCart.map((line) =>
                line.id === item.id ? { ...line, qty: line.qty + 1 } : line,
              ),
            }
          }
          return { shopCart: [...state.shopCart, { ...item, qty: 1 }] }
        }),
      setCartQty: (id, qty) =>
        set((state) => ({
          shopCart:
            qty <= 0
              ? state.shopCart.filter((line) => line.id !== id)
              : state.shopCart.map((line) =>
                  line.id === id ? { ...line, qty } : line,
                ),
        })),
      removeCartItem: (id) =>
        set((state) => ({
          shopCart: state.shopCart.filter((line) => line.id !== id),
        })),
      clearShopCart: () => set({ shopCart: [] }),
      setMaxDistanceKm: (maxDistanceKm) => set({ maxDistanceKm }),
      setMaxStores: (maxStores) =>
        set({ maxStores: Math.max(1, Math.min(3, Math.round(maxStores) || 1)) }),
      toggleDietNeed: (need) =>
        set((state) => ({
          dietNeeds: state.dietNeeds.includes(need)
            ? state.dietNeeds.filter((item) => item !== need)
            : [...state.dietNeeds, need],
        })),
      saveTrip: (trip) =>
        set((state) => ({ savedTrips: [trip, ...state.savedTrips] })),
      removeSavedTrip: (id) =>
        set((state) => ({
          savedTrips: state.savedTrips.filter((trip) => trip.id !== id),
        })),
      topUpWallet: (amount) => {
        if (!Number.isFinite(amount) || amount <= 0) return
        set((state) => ({
          walletBalance: roundMoney(state.walletBalance + amount),
        }))
      },
      completeTripPayment: (tripId) => {
        const state = get()
        if (state.paidTripIds.includes(tripId)) return 'already-paid'

        const trip = state.savedTrips.find((savedTrip) => savedTrip.id === tripId)
        if (!trip || !Number.isFinite(trip.total) || trip.total < 0) {
          return 'trip-not-found'
        }

        const currentWeek = getLocalWeekKey()
        if (state.budgetSettlementWeek === currentWeek) {
          return 'weekly-budget-used'
        }

        const spent = roundMoney(trip.total)
        const savings = calculateBudgetSavings(state.weeklyBudget, spent)
        const allocatedFromWallet = roundMoney(spent + savings)
        if (state.walletBalance < allocatedFromWallet) {
          return 'insufficient-funds'
        }

        const updatedSavings = roundMoney(state.savingsBalance + savings)
        const transfer: SavingsTransfer = {
          id: `transfer-${tripId}`,
          paidAt: new Date().toISOString(),
          storeNames: trip.stores.map((store) => store.name).join(' + '),
          itemCount: trip.itemCount,
          amountSpent: spent,
          amountSaved: savings,
        }

        set({
          walletBalance: roundMoney(state.walletBalance - allocatedFromWallet),
          savingsBalance: updatedSavings,
          goal: { ...state.goal, current: updatedSavings },
          paidTripIds: [...state.paidTripIds, tripId],
          budgetSettlementWeek: currentWeek,
          savingsTransfers: [transfer, ...state.savingsTransfers],
        })
        return 'completed'
      },
      resetDemo: () => set(defaultState),
    }),
    {
      name: 'cloverpriced-app',
      version: 2,
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<AppState>
        if (version < 2) {
          return {
            ...state,
            weeklyBudget: 100,
            goal: { ...demoSavings.goal, name: 'AC/DC Concert', current: 0 },
            walletBalance: 426.8,
            savingsBalance: 0,
            paidTripIds: [],
            budgetSettlementWeek: null,
            savingsTransfers: [],
          } as AppState
        }
        return state as AppState
      },
    },
  ),
)
