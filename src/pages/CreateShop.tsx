import { ArrowLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductLineRow } from '../components/ProductLineRow'
import { Button, SectionLabel, SegmentedControl } from '../components/ui'
import { getBasketBenchmarkTotal } from '../data/demo'
import { searchProducts } from '../data/products'
import { formatCurrency } from '../lib/format'
import { useApp, type OptimiseMode } from '../store/useApp'

const optimiseOptions = [
  { label: 'Price', value: 'price' as const },
  { label: 'Time', value: 'time' as const },
  { label: 'Both', value: 'both' as const },
]

const modeCopy: Record<OptimiseMode, string> = {
  price: 'Cheapest total, including fuel or fare.',
  time: 'Closest store, whatever it costs.',
  both: 'Balances the money you save against the time it takes.',
}

export function CreateShop() {
  const navigate = useNavigate()
  const tripList = useApp((state) => state.tripList)
  const basket = useApp((state) => state.basket)
  const optimiseMode = useApp((state) => state.optimiseMode)
  const timeValuePerHour = useApp((state) => state.timeValuePerHour)
  const addToTripList = useApp((state) => state.addToTripList)
  const setTripListQty = useApp((state) => state.setTripListQty)
  const setOptimiseMode = useApp((state) => state.setOptimiseMode)
  const setTimeValuePerHour = useApp((state) => state.setTimeValuePerHour)

  const [query, setQuery] = useState('')

  const lines = tripList.length > 0 ? tripList : basket
  const benchmarkTotal = getBasketBenchmarkTotal(lines)

  const searchResults = useMemo(
    () => searchProducts(query).slice(0, 6),
    [query],
  )

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-5 pb-4 pt-6">
        <button
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft size={20} strokeWidth={1.75} />
        </button>

        <h1 className="mt-6 text-2xl font-bold tracking-tight">Your shop</h1>
        <p className="mt-3 text-base leading-6 text-mute">
          Add ingredients and choose how to rank stores.
        </p>

        <section className="mt-8">
          <SectionLabel>Add ingredients</SectionLabel>
          <div className="relative mt-3">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mute"
              size={20}
              strokeWidth={1.75}
            />
            <input
              className="min-h-11 w-full rounded-xl border border-ink bg-paper py-3 pl-11 pr-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              placeholder="Search ingredients"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {query.trim() && (
            <ul className="mt-3 border-t border-rule">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 last:border-b-0"
                >
                  <div>
                    <p className="text-[15px] font-semibold">{product.name}</p>
                    <p className="text-[13px] text-mute">{product.unit}</p>
                  </div>
                  <button
                    className="min-h-11 rounded-xl border border-ink px-4 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                    onClick={() => {
                      addToTripList(product.id)
                      setQuery('')
                    }}
                    type="button"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8">
          <SectionLabel>Your list</SectionLabel>
          {lines.length === 0 ? (
            <p className="mt-3 text-base text-mute">
              Nothing on your list yet. Add an ingredient to get started.
            </p>
          ) : (
            <div className="mt-3 border-t border-rule">
              {lines.map((line) => (
                <ProductLineRow
                  key={line.productId}
                  productId={line.productId}
                  qty={line.qty}
                  onQtyChange={(qty) => setTripListQty(line.productId, qty)}
                />
              ))}
            </div>
          )}
          {lines.length > 0 && (
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-rule pt-4">
              <p className="text-[15px] font-semibold">Benchmark total</p>
              <p className="tnum text-[15px] font-semibold">
                {formatCurrency(benchmarkTotal)}
              </p>
            </div>
          )}
        </section>

        <section className="mt-8">
          <SectionLabel>Optimise for</SectionLabel>
          <div className="mt-3">
            <SegmentedControl
              label="Optimise mode"
              options={optimiseOptions}
              value={optimiseMode}
              onChange={setOptimiseMode}
            />
          </div>
          <p className="mt-3 text-[13px] text-mute">{modeCopy[optimiseMode]}</p>

          {optimiseMode === 'both' && (
            <label className="mt-4 block">
              <span className="text-[13px] font-semibold text-mute">
                What an hour of your time is worth
              </span>
              <div className="mt-2 flex items-center gap-3">
                <input
                  aria-valuetext={`$${timeValuePerHour} per hour`}
                  className="flex-1 accent-forest"
                  max={60}
                  min={10}
                  step={1}
                  type="range"
                  value={timeValuePerHour}
                  onChange={(event) =>
                    setTimeValuePerHour(Number(event.target.value))
                  }
                />
                <span className="tnum min-w-14 text-right text-[15px] font-semibold">
                  ${timeValuePerHour}/hr
                </span>
              </div>
            </label>
          )}
        </section>
      </div>

      <div className="sticky bottom-0 border-t border-rule bg-paper px-5 py-4">
        <Button
          className="w-full"
          disabled={lines.length === 0}
          onClick={() => navigate('/results')}
        >
          Find best store
        </Button>
      </div>
    </div>
  )
}
