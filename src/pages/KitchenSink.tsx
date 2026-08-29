import { useState } from 'react'
import { BrandLockup } from '../components/BrandLockup'
import {
  Button,
  HeroFigure,
  SectionLabel,
  SegmentedControl,
  StatRow,
} from '../components/ui'

const modes = [
  { label: 'Price', value: 'price' },
  { label: 'Time', value: 'time' },
  { label: 'Both', value: 'both' },
] as const

type Mode = (typeof modes)[number]['value']

export function KitchenSink() {
  const [mode, setMode] = useState<Mode>('both')

  return (
    <div className="px-5 pb-8 pt-6">
      <header className="border-b border-rule pb-6">
        <BrandLockup />
        <p className="mt-3 max-w-[32ch] text-base leading-6 text-mute">
          Every basket you buy anyway, priced against the big two.
        </p>
      </header>

      <section className="py-8">
        <SectionLabel>Display figure</SectionLabel>
        <HeroFigure className="mt-4">$47.20</HeroFigure>
        <p className="mt-2 text-[13px] leading-5 text-mute">
          Saved vs Coles/Woolworths average
        </p>
      </section>

      <section className="border-t border-rule py-8">
        <SectionLabel>Type scale</SectionLabel>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">
          Your weekly shop
        </h1>
        <p className="mt-3 text-base leading-6">
          Compare the basket, the travel cost, and the time it takes.
        </p>
        <p className="mt-2 text-[13px] leading-5 text-mute">
          St Lucia, Brisbane
        </p>
      </section>

      <section className="border-t border-rule py-8">
        <SectionLabel>Controls</SectionLabel>
        <div className="mt-4">
          <SegmentedControl
            label="Optimise by"
            onChange={setMode}
            options={modes}
            value={mode}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </section>

      <section className="border-t border-rule pt-8">
        <SectionLabel>Data rows</SectionLabel>
        <div className="mt-3">
          <StatRow label="This month saved" value="$31.40" />
          <StatRow label="This month spent" value="$184.60" />
          <StatRow label="Last trip saved" value="$12.80" />
        </div>
      </section>
    </div>
  )
}
