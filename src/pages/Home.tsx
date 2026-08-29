import { User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { GoalProgress } from '../components/GoalProgress'
import { SavingsBasket } from '../components/SavingsBasket'
import { HeroFigure, SectionLabel, StatRow } from '../components/ui'
import { demoSavings } from '../data/demo'
import { formatCurrency } from '../lib/format'

export function Home() {
  return (
    <div className="page-container page-home pb-24 pt-6">
      <div className="home-header flex items-start justify-between gap-4">
        <BrandLockup />
        <Link
          aria-label="Open profile"
          className="glass-panel flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-ink text-ink hover:border-forest hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          to="/profile"
        >
          <User size={20} strokeWidth={1.75} />
        </Link>
      </div>

      <section className="home-story">
        <div className="glass-panel relative mx-auto mt-6 flex h-[278px] w-full max-w-[330px] items-center justify-center overflow-hidden rounded-[2rem]">
          <div className="accent-orb-lime floating-orb absolute left-4 top-5 h-12 w-12 rounded-full blur-xl" />
          <div className="accent-orb-forest absolute bottom-5 right-7 h-20 w-20 rounded-full blur-2xl" />
          <SavingsBasket
            className="relative z-[1]"
            summary={`${formatCurrency(demoSavings.allTimeSaved)} saved. ${demoSavings.equivalenceLine}.`}
          />
          <span className="savings-badge absolute bottom-4 left-1/2 z-[2] -translate-x-1/2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-forest backdrop-blur">
            Your savings orbit
          </span>
        </div>

        <HeroFigure className="mt-6 text-center">
          {formatCurrency(demoSavings.allTimeSaved)}
        </HeroFigure>
        <p className="mt-2 text-center text-base text-xs text-mute">
          saved vs Coles/Woolworths average
        </p>
        <p className="mt-1 text-center text-[15px] font-semibold">
          {demoSavings.equivalenceLine}
        </p>
      </section>

      <section className="home-metrics glass-panel mt-8 overflow-hidden rounded-2xl px-4">
        <div className="border-b border-rule py-4">
          <SectionLabel>My goal</SectionLabel>
          <div className="mt-3">
            <GoalProgress
              current={demoSavings.goal.current}
              name={demoSavings.goal.name}
              target={demoSavings.goal.target}
            />
          </div>
        </div>
        <StatRow
          label="This month saved"
          value={formatCurrency(demoSavings.thisMonthSaved)}
        />
        <StatRow
          label="This month spent"
          value={formatCurrency(demoSavings.thisMonthSpent)}
        />
        <StatRow
          label="Last trip saved"
          value={formatCurrency(demoSavings.lastTripSaved)}
        />
      </section>
    </div>
  )
}
