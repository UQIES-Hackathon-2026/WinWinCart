import { useNavigate } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { Button, SectionLabel } from '../components/ui'

export function Settings() {
  const navigate = useNavigate()

  return (
    <div className="px-5 py-8">
      <BrandLockup />
      <h1 className="mt-10 text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        This routed shell is ready for the next build phase.
      </p>

      <section className="mt-10 border-t border-rule pt-8">
        <SectionLabel>Developer</SectionLabel>
        <p className="mt-3 text-base leading-6 text-mute">
          Preview type scale, controls, and data rows.
        </p>
        <Button
          className="mt-4 w-full"
          variant="secondary"
          onClick={() => navigate('/kitchen-sink')}
        >
          Design system
        </Button>
      </section>
    </div>
  )
}
