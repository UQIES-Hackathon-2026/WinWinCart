import { useNavigate } from 'react-router-dom'
import { ProductLineRow } from '../components/ProductLineRow'
import { Button, SectionLabel } from '../components/ui'
import { getBasketBenchmarkTotal } from '../data/demo'
import { formatCurrency } from '../lib/format'
import { useApp } from '../store/useApp'

export function Basket() {
  const navigate = useNavigate()
  const basket = useApp((state) => state.basket)
  const setBasketQty = useApp((state) => state.setBasketQty)

  const benchmarkTotal = getBasketBenchmarkTotal(basket)

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex-1 px-5 pb-4 pt-8">
        <h1 className="text-2xl font-bold tracking-tight">Basket</h1>
        <p className="mt-3 text-base leading-6 text-mute">
          Your grocery cart, priced against Coles/Woolworths average.
        </p>

        <section className="mt-8">
          <SectionLabel>Line items</SectionLabel>
          {basket.length === 0 ? (
            <p className="mt-3 text-base text-mute">
              Nothing in your basket yet. Add items from a trip or your list.
            </p>
          ) : (
            <div className="mt-3 border-t border-rule">
              {basket.map((line) => (
                <ProductLineRow
                  key={line.productId}
                  productId={line.productId}
                  qty={line.qty}
                  onQtyChange={(qty) => setBasketQty(line.productId, qty)}
                />
              ))}
            </div>
          )}
        </section>

        {basket.length > 0 && (
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-rule pt-4">
            <p className="text-[15px] font-semibold">Benchmark total</p>
            <p className="tnum text-[15px] font-semibold">
              {formatCurrency(benchmarkTotal)}
            </p>
          </div>
        )}
      </div>

      <div className="sticky bottom-16 border-t border-rule bg-paper px-5 py-4">
        <Button
          className="w-full"
          disabled={basket.length === 0}
          onClick={() => navigate('/trip/create')}
        >
          Create trip and optimise
        </Button>
      </div>
    </div>
  )
}
