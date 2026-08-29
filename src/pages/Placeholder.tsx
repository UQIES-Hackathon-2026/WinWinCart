import { BrandLockup } from '../components/BrandLockup'

type PlaceholderProps = {
  title: string
}

export function Placeholder({ title }: PlaceholderProps) {
  return (
    <div className="px-5 py-8">
      <BrandLockup />
      <h1 className="mt-10 text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        This routed shell is ready for the next build phase.
      </p>
    </div>
  )
}
