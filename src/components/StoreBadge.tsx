import { brandForChain } from '../data/brands'
import type { Chain } from '../data/stores'

type StoreBadgeProps = {
  chain: Chain
  size?: 'sm' | 'md'
}

export function StoreBadge({ chain, size = 'md' }: StoreBadgeProps) {
  const brand = brandForChain(chain)
  const dimensions =
    size === 'sm' ? 'h-7 min-w-7 text-[10px] px-1.5' : 'h-9 min-w-9 text-xs px-2'

  return (
    <span
      className={[
        'inline-flex items-center justify-center gap-1 rounded-lg font-bold',
        dimensions,
      ].join(' ')}
      style={{ backgroundColor: brand.bg, color: brand.fg }}
      title={brand.label}
    >
      <span aria-hidden="true">{brand.emoji}</span>
      {brand.short}
    </span>
  )
}

type StoreBadgeRowProps = {
  chains: Chain[]
  size?: 'sm' | 'md'
}

export function StoreBadgeRow({ chains, size = 'md' }: StoreBadgeRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chains.map((chain, index) => (
        <StoreBadge key={`${chain}-${index}`} chain={chain} size={size} />
      ))}
    </div>
  )
}
