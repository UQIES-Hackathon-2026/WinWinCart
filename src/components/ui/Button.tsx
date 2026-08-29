import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const variants = {
  primary: 'border-forest bg-forest text-ink',
  secondary: 'border-ink bg-transparent text-ink hover:bg-sunk',
}

export function Button({
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'app-button min-h-11 rounded-xl border px-5 py-3 text-base font-bold',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    />
  )
}
