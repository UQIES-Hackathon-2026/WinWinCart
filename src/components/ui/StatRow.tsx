import type { ReactNode } from 'react'

type StatRowProps = {
  label: ReactNode
  value: ReactNode
}

export function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 text-[15px] font-semibold">
      <span>{label}</span>
      <span className="tnum text-right">{value}</span>
    </div>
  )
}
