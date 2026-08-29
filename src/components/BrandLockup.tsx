import logoUrl from '../../Assets/Logo.svg'
import titleUrl from '../../Assets/Title.svg'

type BrandLockupProps = {
  className?: string
}

export function BrandLockup({ className = '' }: BrandLockupProps) {
  return (
    <div
      aria-label="Cloverpriced"
      className={['flex items-center gap-2.5', className].join(' ')}
      role="img"
    >
      <img
        alt=""
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        src={logoUrl}
      />
      <img
        alt=""
        aria-hidden="true"
        className="h-auto w-40"
        src={titleUrl}
      />
    </div>
  )
}
