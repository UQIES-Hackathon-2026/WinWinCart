import { Check, X } from 'lucide-react'
import { useEffect } from 'react'
import {
  CATEGORY_META,
  itemsInCategory,
  type FoodCategory,
} from '../data/catalog'
import { useApp } from '../store/useApp'

type CategorySheetProps = {
  category: FoodCategory
  onClose: () => void
}

export function CategorySheet({ category, onClose }: CategorySheetProps) {
  const dietNeeds = useApp((state) => state.dietNeeds)
  const shopCart = useApp((state) => state.shopCart)
  const addCartItem = useApp((state) => state.addCartItem)
  const removeCartItem = useApp((state) => state.removeCartItem)

  const meta = CATEGORY_META.find((entry) => entry.id === category)
  const items = itemsInCategory(category, dietNeeds)

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
        type="button"
      />
      <div className="relative mt-auto w-full max-w-[390px] rounded-t-3xl bg-paper p-5 shadow-[0_-12px_40px_rgba(0,0,0,0.2)]">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-rule" />
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <span aria-hidden="true">{meta?.emoji}</span>
            {meta?.label}
          </h2>
          <button
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rule"
            onClick={onClose}
            type="button"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <p className="mt-1 text-[13px] text-mute">
          Tap to add common {meta?.label.toLowerCase()} to your list.
        </p>

        <ul className="mt-4 grid max-h-[52vh] grid-cols-2 gap-2 overflow-y-auto scrollbar-hide">
          {items.map((item) => {
            const inCart = shopCart.some((line) => line.id === item.id)
            return (
              <li key={item.id}>
                <button
                  aria-pressed={inCart}
                  className={[
                    'flex w-full items-center gap-2 rounded-2xl border p-3 text-left',
                    inCart
                      ? 'border-forest bg-mint'
                      : 'border-rule bg-paper',
                  ].join(' ')}
                  onClick={() =>
                    inCart
                      ? removeCartItem(item.id)
                      : addCartItem({
                          id: item.id,
                          name: item.name,
                          emoji: item.emoji,
                        })
                  }
                  type="button"
                >
                  <span aria-hidden="true" className="text-xl">
                    {item.emoji}
                  </span>
                  <span className="min-w-0 flex-1 text-[13px] font-semibold">
                    {item.name}
                  </span>
                  {inCart && (
                    <Check
                      aria-hidden="true"
                      className="shrink-0 text-forest"
                      size={16}
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              </li>
            )
          })}
          {items.length === 0 && (
            <li className="col-span-2 py-6 text-center text-[13px] text-mute">
              Nothing here fits the dietary filters you picked.
            </li>
          )}
        </ul>

        <button
          className="mt-4 min-h-11 w-full rounded-xl border border-forest bg-forest px-5 py-3 text-base font-bold text-paper"
          onClick={onClose}
          type="button"
        >
          Done
        </button>
      </div>
    </div>
  )
}
