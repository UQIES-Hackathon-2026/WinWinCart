import logoUrl from '../../Assets/Logo.svg'

type BasketIllustrationProps = {
  className?: string
}

export function BasketIllustration({ className = '' }: BasketIllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={['flex items-center justify-center', className].join(' ')}
    >
      <svg
        className="h-40 w-40"
        fill="none"
        viewBox="0 0 160 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 58 L120 58 L110 130 L50 130 Z"
          fill="#084E46"
        />
        <ellipse cx="80" cy="58" rx="42" ry="8" fill="#084E46" />
        <path
          d="M52 58 C52 28 108 28 108 58"
          fill="none"
          stroke="#084E46"
          strokeLinecap="round"
          strokeWidth="6"
        />
        <rect fill="#FFFFFF" height="18" rx="2" width="14" x="58" y="72" />
        <rect fill="#91EF5B" height="4" rx="1" width="14" x="58" y="72" />
        <rect fill="#E5E5E5" height="10" rx="3" width="20" x="78" y="80" />
        <ellipse cx="68" cy="98" fill="#91EF5B" rx="6" ry="10" />
        <ellipse cx="82" cy="96" fill="#91EF5B" rx="6" ry="10" />
        <rect fill="#FFFFFF" height="16" rx="2" width="12" x="92" y="88" />
        <rect fill="#084E46" height="3" width="12" x="92" y="88" />
        <image height="32" href={logoUrl} width="32" x="64" y="108" />
      </svg>
    </div>
  )
}
