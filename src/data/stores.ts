export type Chain =
  | 'coles'
  | 'woolworths'
  | 'aldi'
  | 'iga'
  | 'independent'

export type Store = {
  id: string
  name: string
  chain: Chain
  suburb: string
  distanceKm: number
  driveMinutes: number
  busMinutes: number
}

export const stores: Store[] = [
  {
    id: 'iga-st-lucia',
    name: 'IGA St Lucia',
    chain: 'iga',
    suburb: 'St Lucia',
    distanceKm: 0.9,
    driveMinutes: 4,
    busMinutes: 8,
  },
  {
    id: 'coles-toowong',
    name: 'Coles Toowong',
    chain: 'coles',
    suburb: 'Toowong',
    distanceKm: 2.6,
    driveMinutes: 7,
    busMinutes: 14,
  },
  {
    id: 'woolworths-toowong',
    name: 'Woolworths Toowong',
    chain: 'woolworths',
    suburb: 'Toowong',
    distanceKm: 2.8,
    driveMinutes: 8,
    busMinutes: 15,
  },
  {
    id: 'aldi-indooroopilly',
    name: 'ALDI Indooroopilly',
    chain: 'aldi',
    suburb: 'Indooroopilly',
    distanceKm: 3.5,
    driveMinutes: 9,
    busMinutes: 19,
  },
  {
    id: 'woolworths-indooroopilly',
    name: 'Woolworths Indooroopilly',
    chain: 'woolworths',
    suburb: 'Indooroopilly',
    distanceKm: 3.4,
    driveMinutes: 9,
    busMinutes: 18,
  },
  {
    id: 'coles-indooroopilly',
    name: 'Coles Indooroopilly',
    chain: 'coles',
    suburb: 'Indooroopilly',
    distanceKm: 3.6,
    driveMinutes: 9,
    busMinutes: 19,
  },
  {
    id: 'yuens-sunnybank',
    name: "Yuen's Market",
    chain: 'independent',
    suburb: 'Sunnybank',
    distanceKm: 13.8,
    driveMinutes: 20,
    busMinutes: 47,
  },
  {
    id: 'aldi-moorooka',
    name: 'ALDI Moorooka',
    chain: 'aldi',
    suburb: 'Moorooka',
    distanceKm: 7.2,
    driveMinutes: 13,
    busMinutes: 26,
  },
]

export function getStoreById(id: string): Store | undefined {
  return stores.find((store) => store.id === id)
}
