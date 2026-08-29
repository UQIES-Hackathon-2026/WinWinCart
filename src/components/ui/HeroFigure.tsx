import type { HTMLAttributes } from 'react'

type HeroFigureProps = HTMLAttributes<HTMLParagraphElement> & {
  color?: 'forest' | 'ink'
}

const colors = {
  forest: 'text-forest',
  ink: 'text-ink',
}

export function HeroFigure({
  className = '',
  color = 'forest',
  ...props
}: HeroFigureProps) {
  return (
    <p
      className={[
        'hero-figure tnum font-display text-[64px] leading-none tracking-tight',
        colors[color],
        className,
      ].join(' ')}
      {...props}
    />
  )
}
