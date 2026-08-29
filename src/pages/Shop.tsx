import { Minus, Plus, Search, SlidersHorizontal, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategorySheet } from '../components/CategorySheet'
import { SegmentedControl } from '../components/ui'
import {
  CATEGORY_META,
  DIET_OPTIONS,
  searchCatalog,
  type FoodCategory,
} from '../data/catalog'
import { useApp, type OptimiseMode } from '../store/useApp'

const rankOptions = [
  { label: 'Price', value: 'price' as const },
  { label: 'Time', value: 'time' as const },
  { label: 'Balance', value: 'both' as const },
]

const rankCopy: Record<OptimiseMode, string> = {
  price: 'Cheapest total, including fuel.',
  time: 'Closest stores, whatever it costs.',
  both: 'Balances money saved against time on the road.',
}

export function Shop() {
  const navigate = useNavigate()
  const shopCart = useApp((state) => state.shopCart)
  const dietNeeds = useApp((state) => state.dietNeeds)
  const maxDistanceKm = useApp((state) => state.maxDistanceKm)
  const maxStores = useApp((state) => state.maxStores)
  const optimiseMode = useApp((state) => state.optimiseMode)
  const addCartItem = useApp((state) => state.addCartItem)
  const setCartQty = useApp((state) => state.setCartQty)
  const removeCartItem = useApp((state) => state.removeCartItem)
  const toggleDietNeed = useApp((state) => state.toggleDietNeed)
  const setMaxDistanceKm = useApp((state) => state.setMaxDistanceKm)
  const setMaxStores = useApp((state) => state.setMaxStores)
  const setOptimiseMode = useApp((state) => state.setOptimiseMode)

  const [query, setQuery] = useState('')
  const [openCategory, setOpenCategory] = useState<FoodCategory | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(true)

  const results = useMemo(
    () => searchCatalog(query, dietNeeds).slice(0, 6),
    [query, dietNeeds],
  )

  const itemCount = shopCart.reduce((total, line) => total + line.qty, 0)

  return (
    <div className="flex min-h-full flex-col bg-sunk">
      <div className="flex-1 px-4 pb-6 pt-7">
        <h1 className="text-2xl font-bold tracking-tight">Shop</h1>
        <p className="mt-1 text-[13px] text-mute">
          Build your list, then compare trips across Brisbane stores.
        </p>

        {/* Add to list */}
        <section className="mt-5">
          <p className="text-[15px] font-semibold">Add to your list</p>
          <div className="mt-2 flex gap-2">
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mute"
                size={18}
                strokeWidth={1.75}
              />
              <input
                className="min-h-12 w-full rounded-xl border border-rule bg-paper py-3 pl-10 pr-3 text-base placeholder:text-mute focus-visible:border-forest focus-visible:outline-none"
                placeholder="e.g. roma tomatoes"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <button
              aria-label="Add first match"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-paper disabled:opacity-40"
              disabled={results.length === 0}
              onClick={() => {
                const first = results[0]
                if (!first) return
                addCartItem({
                  id: first.id,
                  name: first.name,
                  emoji: first.emoji,
                })
                setQuery('')
              }}
              type="button"
            >
              <Plus size={22} strokeWidth={2.25} />
            </button>
          </div>

          {query.trim() && (
            <ul className="mt-2 overflow-hidden rounded-xl border border-rule bg-paper">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    className="flex w-full items-center gap-3 border-b border-rule px-3 py-3 text-left last:border-b-0"
                    onClick={() => {
                      addCartItem({
                        id: item.id,
                        name: item.name,
                        emoji: item.emoji,
                      })
                      setQuery('')
                    }}
                    type="button"
                  >
                    <span aria-hidden="true" className="text-lg">
                      {item.emoji}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold">
                      {item.name}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className="text-forest"
                      size={18}
                      strokeWidth={2}
                    />
                  </button>
                </li>
              ))}
              {results.length === 0 && (
                <li className="px-3 py-3 text-[13px] text-mute">
                  No matches. Try a category below.
                </li>
              )}
            </ul>
          )}
        </section>

        {/* Filters */}
        <section className="mt-4 rounded-2xl border border-rule bg-paper">
          <button
            aria-expanded={filtersOpen}
            className="flex w-full items-center justify-between gap-3 p-4"
            onClick={() => setFiltersOpen((open) => !open)}
            type="button"
          >
            <span className="flex items-center gap-2.5">
              <SlidersHorizontal
                aria-hidden="true"
                className="text-forest"
                size={20}
                strokeWidth={1.75}
              />
              <span className="text-left">
                <span className="block text-[15px] font-semibold">Filters</span>
                <span className="tnum block text-[13px] text-mute">
                  {maxDistanceKm} km · up to {maxStores} store
                  {maxStores === 1 ? '' : 's'}
                </span>
              </span>
            </span>
            <span className="text-[13px] font-semibold text-forest">
              {filtersOpen ? 'Hide' : 'Show'}
            </span>
          </button>

          {filtersOpen && (
            <div className="space-y-5 border-t border-rule p-4">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    className="text-[15px] font-semibold"
                    htmlFor="shop-distance"
                  >
                    Distance willing to travel
                  </label>
                  <span className="tnum text-[15px] font-semibold text-forest">
                    {maxDistanceKm} km
                  </span>
                </div>
                <input
                  className="mt-2 w-full accent-forest"
                  id="shop-distance"
                  max={20}
                  min={1}
                  step={1}
                  type="range"
                  value={maxDistanceKm}
                  onChange={(event) =>
                    setMaxDistanceKm(Number(event.target.value))
                  }
                />
              </div>

              <div>
                <p className="text-[15px] font-semibold">Dietary needs</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DIET_OPTIONS.map((option) => {
                    const active = dietNeeds.includes(option.id)
                    return (
                      <button
                        key={option.id}
                        aria-pressed={active}
                        className={[
                          'rounded-full border px-4 py-2 text-[13px] font-semibold',
                          active
                            ? 'border-forest bg-forest text-paper'
                            : 'border-rule bg-paper text-ink',
                        ].join(' ')}
                        onClick={() => toggleDietNeed(option.id)}
                        type="button"
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label
                  className="text-[15px] font-semibold"
                  htmlFor="shop-max-stores"
                >
                  Stores you’re willing to visit
                </label>
                <input
                  className="tnum mt-2 block h-12 w-20 rounded-xl border border-rule bg-paper px-4 text-base focus-visible:border-forest focus-visible:outline-none"
                  id="shop-max-stores"
                  inputMode="numeric"
                  max={3}
                  min={1}
                  step={1}
                  type="number"
                  value={maxStores}
                  onChange={(event) =>
                    setMaxStores(Number(event.target.value) || 1)
                  }
                />
              </div>

              <div>
                <p className="text-[15px] font-semibold">Rank trips by</p>
                <div className="mt-2">
                  <SegmentedControl
                    label="Rank trips by"
                    options={rankOptions}
                    value={optimiseMode}
                    onChange={setOptimiseMode}
                  />
                </div>
                <p className="mt-2 text-[13px] text-mute">
                  {rankCopy[optimiseMode]}
                </p>
              </div>
            </div>
          )}
        </section>

        <div className="mt-3 flex flex-wrap gap-2">
          {CATEGORY_META.map((category) => (
            <button
              key={category.id}
              className="flex items-center gap-1.5 rounded-xl border border-rule bg-paper px-3.5 py-2.5 text-[13px] font-semibold"
              onClick={() => setOpenCategory(category.id)}
              type="button"
            >
              <span aria-hidden="true">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Your list */}
        <section className="mt-5 rounded-2xl border border-rule bg-paper p-4">
          <p className="text-[15px] font-semibold">
            {itemCount === 0
              ? 'No items yet'
              : `${itemCount} item${itemCount === 1 ? '' : 's'}`}
          </p>
          {shopCart.length === 0 ? (
            <p className="mt-2 text-[13px] text-mute">
              Search or pick a category to start your list.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {shopCart.map((line) => (
                <li
                  key={line.id}
                  className="flex items-center gap-3 rounded-xl bg-sunk px-3 py-2.5"
                >
                  <span aria-hidden="true" className="text-xl">
                    {line.emoji}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[15px] font-semibold">
                    {line.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      aria-label={`Decrease ${line.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-rule bg-paper"
                      onClick={() => setCartQty(line.id, line.qty - 1)}
                      type="button"
                    >
                      <Minus size={15} strokeWidth={2} />
                    </button>
                    <span className="tnum w-5 text-center text-[15px] font-semibold">
                      {line.qty}
                    </span>
                    <button
                      aria-label={`Increase ${line.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-rule bg-paper"
                      onClick={() => setCartQty(line.id, line.qty + 1)}
                      type="button"
                    >
                      <Plus size={15} strokeWidth={2} />
                    </button>
                  </div>
                  <button
                    aria-label={`Remove ${line.name}`}
                    className="flex h-8 w-8 items-center justify-center text-mute"
                    onClick={() => removeCartItem(line.id)}
                    type="button"
                  >
                    <Trash2 size={17} strokeWidth={1.75} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="sticky bottom-0 border-t border-rule bg-paper px-4 py-3">
        <button
          className="min-h-12 w-full rounded-xl border border-forest bg-forest px-5 py-3 text-base font-bold text-paper disabled:opacity-40"
          disabled={shopCart.length === 0}
          onClick={() => navigate('/shop/compare')}
          type="button"
        >
          Compare prices
        </button>
      </div>

      {openCategory && (
        <CategorySheet
          category={openCategory}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </div>
  )
}
