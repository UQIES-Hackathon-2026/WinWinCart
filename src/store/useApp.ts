import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { demoBasketLines, demoSavings } from '../data/demo'

export type Transport = 'car' | 'bus' | 'walk'
export type OptimiseMode = 'price' | 'time' | 'both'

export type BasketItem = {
  productId: string
  qty: number
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
  resetDemo: () => void
}

const defaultState = {
  suburb: 'St Lucia 4067',
  transport: 'car' as Transport,
  litresPer100km: 8,
  timeValuePerHour: 22,
  weeklyBudget: 220,
  goal: demoSavings.goal,
  basket: demoBasketLines,
  tripList: [] as BasketItem[],
  optimiseMode: 'both' as OptimiseMode,
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
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
      resetDemo: () => set(defaultState),
    }),
    { name: 'cloverpriced-app' },
  ),
)
