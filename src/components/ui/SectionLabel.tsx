import type { HTMLAttributes } from 'react'

export function SectionLabel({
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        'section-label text-[11px] font-bold uppercase tracking-[0.08em] text-mute',
        className,
      ].join(' ')}
      {...props}
    />
  )
}
