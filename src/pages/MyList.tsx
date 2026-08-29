import { useState } from 'react'
import {
  demoFavoriteIngredients,
  demoFavoriteItems,
  demoSavedTrips,
} from '../data/demo'
import { getBenchmarkPrice, getProductById } from '../data/products'
import { formatCurrency } from '../lib/format'
import { SectionLabel, SegmentedControl } from '../components/ui'

type ListTab = 'items' | 'ingredients' | 'trips'

const listTabs = [
  { label: 'Items', value: 'items' as const },
  { label: 'Ingredients', value: 'ingredients' as const },
  { label: 'Trips', value: 'trips' as const },
]

export function MyList() {
  const [tab, setTab] = useState<ListTab>('items')

  return (
    <div className="page-container page-list pb-8 pt-8">
      <h1 className="text-2xl font-bold tracking-tight">My list</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        Favorites you reach for again and again.
      </p>

      <div className="mt-8">
        <SegmentedControl
          label="List category"
          options={listTabs}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === 'items' && (
        <section className="mt-8">
          <SectionLabel>Favorite items</SectionLabel>
          <ul className="mt-3">
            {demoFavoriteItems.map((item) => {
              const product = getProductById(item.productId)
              if (!product) return null
              const benchmark = getBenchmarkPrice(product)

              return (
                <li
                  key={item.id}
                  className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 last:border-b-0"
                >
                  <div>
                    <p className="text-[15px] font-semibold">{product.name}</p>
                    <p className="text-[13px] text-mute">{product.unit}</p>
                  </div>
                  <p className="tnum text-[13px] text-mute">
                    {formatCurrency(benchmark)} avg
                  </p>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {tab === 'ingredients' && (
        <section className="mt-8">
          <SectionLabel>Favorite ingredients</SectionLabel>
          <ul className="mt-3">
            {demoFavoriteIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 last:border-b-0"
              >
                <p className="text-[15px] font-semibold">{ingredient.name}</p>
                <p className="text-[13px] text-mute">{ingredient.typicalUnit}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tab === 'trips' && (
        <section className="mt-8">
          <SectionLabel>Saved trips</SectionLabel>
          <ul className="mt-3">
            {demoSavedTrips.map((trip) => (
              <li
                key={trip.id}
                className="border-b border-rule py-4 last:border-b-0"
              >
                <p className="text-[15px] font-semibold">{trip.name}</p>
                <p className="mt-1 text-[13px] text-mute">
                  {trip.itemCount} items
                </p>
                <p className="tnum mt-1 text-[13px] text-mute">
                  {formatCurrency(trip.estimatedBenchmark)} benchmark
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
