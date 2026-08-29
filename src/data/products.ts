import type { Chain } from './stores'

export type Product = {
  id: string
  name: string
  unit: string
  category: 'produce' | 'pantry' | 'dairy' | 'meat' | 'packaged'
  prices: Partial<Record<Chain, number | null>>
}

export const products: Product[] = [
  {
    id: 'milk-2l',
    name: 'Full cream milk',
    unit: '2L',
    category: 'dairy',
    prices: {
      coles: 3.3,
      woolworths: 3.3,
      aldi: 3.15,
      iga: 3.9,
      independent: 4.1,
    },
  },
  {
    id: 'milk-3l',
    name: 'Full cream milk',
    unit: '3L',
    category: 'dairy',
    prices: {
      coles: 5.0,
      woolworths: 5.0,
      aldi: 4.85,
      iga: 5.8,
      independent: 5.95,
    },
  },
  {
    id: 'bread-loaf',
    name: 'White sandwich loaf',
    unit: '700g',
    category: 'packaged',
    prices: {
      coles: 2.5,
      woolworths: 2.5,
      aldi: 2.19,
      iga: 3.2,
      independent: 2.9,
    },
  },
  {
    id: 'eggs-12',
    name: 'Free range eggs',
    unit: '12',
    category: 'dairy',
    prices: {
      coles: 6.5,
      woolworths: 6.7,
      aldi: 5.79,
      iga: 7.5,
      independent: 6.2,
    },
  },
  {
    id: 'bananas-1kg',
    name: 'Bananas',
    unit: '1kg',
    category: 'produce',
    prices: {
      coles: 3.9,
      woolworths: 4.0,
      aldi: 3.49,
      iga: 4.9,
      independent: 2.99,
    },
  },
  {
    id: 'onions-1kg',
    name: 'Brown onions',
    unit: '1kg',
    category: 'produce',
    prices: {
      coles: 3.0,
      woolworths: 3.0,
      aldi: 2.49,
      iga: 3.8,
      independent: 1.99,
    },
  },
  {
    id: 'potatoes-2kg',
    name: 'Potatoes',
    unit: '2kg',
    category: 'produce',
    prices: {
      coles: 6.0,
      woolworths: 5.9,
      aldi: 4.99,
      iga: 7.2,
      independent: 4.5,
    },
  },
  {
    id: 'chicken-1kg',
    name: 'Chicken breast',
    unit: '1kg',
    category: 'meat',
    prices: {
      coles: 12.5,
      woolworths: 13.0,
      aldi: 10.99,
      iga: 15.0,
      independent: 11.5,
    },
  },
  {
    id: 'rice-5kg',
    name: 'Jasmine rice',
    unit: '5kg',
    category: 'pantry',
    prices: {
      coles: 16.0,
      woolworths: 16.5,
      aldi: 13.99,
      iga: 18.5,
      independent: 11.9,
    },
  },
  {
    id: 'spaghetti-500g',
    name: 'Spaghetti',
    unit: '500g',
    category: 'pantry',
    prices: {
      coles: 2.0,
      woolworths: 2.0,
      aldi: 1.19,
      iga: 2.6,
      independent: 2.4,
    },
  },
  {
    id: 'tomatoes-1kg',
    name: 'Tomatoes',
    unit: '1kg',
    category: 'produce',
    prices: {
      coles: 6.9,
      woolworths: 7.0,
      aldi: 5.99,
      iga: 8.5,
      independent: 4.99,
    },
  },
  {
    id: 'garlic-3',
    name: 'Garlic',
    unit: '3 bulbs',
    category: 'produce',
    prices: {
      coles: 3.5,
      woolworths: 3.5,
      aldi: 2.99,
      iga: 4.2,
      independent: 1.99,
    },
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getBenchmarkPrice(product: Product): number {
  const coles = product.prices.coles
  const woolworths = product.prices.woolworths
  if (coles == null || woolworths == null) {
    return coles ?? woolworths ?? 0
  }
  return (coles + woolworths) / 2
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return products
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.unit.toLowerCase().includes(normalized),
  )
}
