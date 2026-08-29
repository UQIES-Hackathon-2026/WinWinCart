import { Minus, Plus } from 'lucide-react'
import { getBenchmarkPrice, getProductById } from '../data/products'
import { formatCurrency } from '../lib/format'

type QuantityStepperProps = {
  qty: number
  onChange: (qty: number) => void
}

export function QuantityStepper({ qty, onChange }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        onClick={() => onChange(Math.max(0, qty - 1))}
        type="button"
      >
        <Minus size={20} strokeWidth={1.75} />
      </button>
      <span className="tnum min-w-6 text-center text-[15px] font-semibold">
        {qty}
      </span>
      <button
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        onClick={() => onChange(qty + 1)}
        type="button"
      >
        <Plus size={20} strokeWidth={1.75} />
      </button>
    </div>
  )
}

type ProductLineRowProps = {
  productId: string
  qty: number
  onQtyChange: (qty: number) => void
  onRemove?: () => void
}

export function ProductLineRow({
  productId,
  qty,
  onQtyChange,
}: ProductLineRowProps) {
  const product = getProductById(productId)
  if (!product) return null

  const benchmark = getBenchmarkPrice(product)

  return (
    <div className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold">{product.name}</p>
        <p className="text-[13px] text-mute">{product.unit}</p>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <p className="tnum text-[13px] text-mute">
          {formatCurrency(benchmark)}
        </p>
        <QuantityStepper qty={qty} onChange={onQtyChange} />
      </div>
    </div>
  )
}
