export type FoodCategory = 'carbs' | 'dairy' | 'fruits' | 'veggies' | 'meat'

export type DietNeed = 'halal' | 'kosher' | 'vegan' | 'gluten-free'

export type CatalogItem = {
  id: string
  name: string
  emoji: string
  category: FoodCategory
  /** Coles / Woolworths average shelf price, in AUD. */
  basePrice: number
  diet: DietNeed[]
}

const DIET_LETTERS: Record<string, DietNeed> = {
  v: 'vegan',
  h: 'halal',
  k: 'kosher',
  g: 'gluten-free',
}

function mk(
  id: string,
  name: string,
  emoji: string,
  category: FoodCategory,
  basePrice: number,
  diet: string,
): CatalogItem {
  return {
    id,
    name,
    emoji,
    category,
    basePrice,
    diet: diet.split('').map((letter) => DIET_LETTERS[letter]),
  }
}

export const CATEGORY_META: {
  id: FoodCategory
  label: string
  emoji: string
}[] = [
  { id: 'carbs', label: 'Carbs', emoji: '🍞' },
  { id: 'dairy', label: 'Dairy', emoji: '🧀' },
  { id: 'fruits', label: 'Fruits', emoji: '🍎' },
  { id: 'veggies', label: 'Veggies', emoji: '🥦' },
  { id: 'meat', label: 'Meat', emoji: '🍗' },
]

export const catalog: CatalogItem[] = [
  // Carbs
  mk('bread-loaf', 'White bread loaf', '🍞', 'carbs', 2.5, 'vhk'),
  mk('white-rice', 'White rice 1kg', '🍚', 'carbs', 2.2, 'vhkg'),
  mk('pasta', 'Dried pasta 500g', '🍝', 'carbs', 2.0, 'vhk'),
  mk('potatoes', 'Brushed potatoes 2kg', '🥔', 'carbs', 5.95, 'vhkg'),
  mk('cereal', 'Breakfast cereal', '🥣', 'carbs', 4.5, 'vhk'),
  mk('oats', 'Rolled oats 1kg', '🌾', 'carbs', 1.8, 'vhkg'),
  mk('wraps', 'Tortilla wraps', '🌯', 'carbs', 3.5, 'vhk'),
  mk('noodles', 'Hokkien noodles', '🍜', 'carbs', 2.8, 'vhk'),
  mk('rice-crackers', 'Rice crackers', '🍘', 'carbs', 2.5, 'vhkg'),
  mk('frozen-chips', 'Frozen chips 1kg', '🍟', 'carbs', 4.0, 'vhkg'),

  // Dairy
  mk('milk', 'Full cream milk 2L', '🥛', 'dairy', 3.3, 'hkg'),
  mk('cheese', 'Tasty cheese block 500g', '🧀', 'dairy', 8.5, 'hkg'),
  mk('butter', 'Butter 250g', '🧈', 'dairy', 4.55, 'hkg'),
  mk('yoghurt', 'Greek yoghurt 1kg', '🍦', 'dairy', 6.0, 'hkg'),
  mk('eggs', 'Free range eggs 12pk', '🥚', 'dairy', 6.6, 'hkg'),
  mk('cream', 'Thickened cream 300ml', '🥛', 'dairy', 2.2, 'hkg'),
  mk('sour-cream', 'Sour cream 300g', '🥣', 'dairy', 2.5, 'hkg'),
  mk('feta', 'Feta 200g', '🧀', 'dairy', 5.5, 'hkg'),
  mk('cream-cheese', 'Cream cheese 250g', '🧀', 'dairy', 4.0, 'hkg'),
  mk('custard', 'Custard 1L', '🍮', 'dairy', 3.0, 'hkg'),

  // Fruits
  mk('bananas', 'Bananas 1kg', '🍌', 'fruits', 3.95, 'vhkg'),
  mk('apples', 'Apples 1kg', '🍎', 'fruits', 4.5, 'vhkg'),
  mk('oranges', 'Oranges 2kg', '🍊', 'fruits', 6.0, 'vhkg'),
  mk('strawberries', 'Strawberries 250g', '🍓', 'fruits', 4.0, 'vhkg'),
  mk('grapes', 'Seedless grapes 500g', '🍇', 'fruits', 7.0, 'vhkg'),
  mk('blueberries', 'Blueberries 125g', '🫐', 'fruits', 3.5, 'vhkg'),
  mk('watermelon', 'Watermelon quarter', '🍉', 'fruits', 5.0, 'vhkg'),
  mk('mango', 'Mango each', '🥭', 'fruits', 2.5, 'vhkg'),
  mk('pineapple', 'Pineapple each', '🍍', 'fruits', 4.0, 'vhkg'),
  mk('avocado', 'Avocado each', '🥑', 'fruits', 1.8, 'vhkg'),
  mk('lemon', 'Lemon each', '🍋', 'fruits', 0.9, 'vhkg'),

  // Veggies
  mk('carrots', 'Carrots 1kg', '🥕', 'veggies', 2.2, 'vhkg'),
  mk('broccoli', 'Broccoli each', '🥦', 'veggies', 3.5, 'vhkg'),
  mk('cabbage', 'Cabbage each', '🥬', 'veggies', 3.0, 'vhkg'),
  mk('tomatoes', 'Tomatoes 1kg', '🍅', 'veggies', 6.95, 'vhkg'),
  mk('onions', 'Brown onions 1kg', '🧅', 'veggies', 3.0, 'vhkg'),
  mk('capsicum', 'Red capsicum each', '🫑', 'veggies', 1.5, 'vhkg'),
  mk('cucumber', 'Lebanese cucumber each', '🥒', 'veggies', 1.2, 'vhkg'),
  mk('spinach', 'Baby spinach 120g', '🥬', 'veggies', 3.5, 'vhkg'),
  mk('mushrooms', 'Button mushrooms 400g', '🍄', 'veggies', 4.0, 'vhkg'),
  mk('sweet-potato', 'Sweet potato 1kg', '🍠', 'veggies', 3.5, 'vhkg'),
  mk('corn', 'Sweet corn each', '🌽', 'veggies', 1.0, 'vhkg'),
  mk('pumpkin', 'Pumpkin half', '🎃', 'veggies', 3.0, 'vhkg'),

  // Meat
  mk('chicken-breast', 'Chicken breast 1kg', '🍗', 'meat', 12.75, 'hkg'),
  mk('beef-mince', 'Beef mince 500g', '🥩', 'meat', 8.25, 'hkg'),
  mk('pork-chops', 'Pork chops 1kg', '🍖', 'meat', 16.25, 'g'),
  mk('bacon', 'Streaky bacon 250g', '🥓', 'meat', 6.0, 'g'),
  mk('sausages', 'Beef sausages 1kg', '🌭', 'meat', 7.0, 'hkg'),
  mk('lamb-chops', 'Lamb chops 1kg', '🍖', 'meat', 15.0, 'hkg'),
  mk('chicken-thigh', 'Chicken thigh fillets 1kg', '🍗', 'meat', 11.0, 'hkg'),
  mk('ham', 'Sliced ham 200g', '🍖', 'meat', 5.0, 'g'),
  mk('salmon', 'Salmon fillets 300g', '🐟', 'meat', 14.0, 'hkg'),
  mk('prawns', 'Green prawns 300g', '🦐', 'meat', 16.0, 'h'),
  mk('tofu', 'Firm tofu 300g', '🧊', 'meat', 3.0, 'vhkg'),
]

const catalogIndex = new Map(catalog.map((item) => [item.id, item]))

export function catalogById(id: string): CatalogItem | undefined {
  return catalogIndex.get(id)
}

export function itemsInCategory(
  category: FoodCategory,
  diet: DietNeed[] = [],
): CatalogItem[] {
  return catalog.filter(
    (item) => item.category === category && matchesDiet(item, diet),
  )
}

export function searchCatalog(
  query: string,
  diet: DietNeed[] = [],
): CatalogItem[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []
  return catalog.filter(
    (item) =>
      matchesDiet(item, diet) &&
      item.name.toLowerCase().includes(normalized),
  )
}

export function matchesDiet(item: CatalogItem, diet: DietNeed[]): boolean {
  return diet.every((need) => item.diet.includes(need))
}

export const DIET_OPTIONS: { id: DietNeed; label: string }[] = [
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten free' },
]
