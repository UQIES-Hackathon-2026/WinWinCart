import { User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { BasketIllustration } from '../components/BasketIllustration'
import { BrandLockup } from '../components/BrandLockup'
import { GoalProgress } from '../components/GoalProgress'
import { Button, HeroFigure, StatRow } from '../components/ui'
import { demoSavings } from '../data/demo'
import { formatCurrency } from '../lib/format'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="px-5 pb-8 pt-6">
      <div className="flex items-start justify-between gap-4">
        <BrandLockup />
        <Link
          aria-label="Open profile"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          to="/profile"
        >
          <User size={20} strokeWidth={1.75} />
        </Link>
      </div>

      <BasketIllustration className="mx-auto mt-6" />

      <HeroFigure className="mt-6 text-center">
        {formatCurrency(demoSavings.allTimeSaved)}
      </HeroFigure>
      <p className="mt-2 text-center text-base text-mute">
        saved vs Coles/Woolworths average
      </p>
      <p className="mt-1 text-center text-[15px] font-semibold">
        {demoSavings.equivalenceLine}
      </p>

      <div className="mt-8 border-t border-rule">
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
      </div>

      <section className="mt-8">
        <GoalProgress
          current={demoSavings.goal.current}
          name={demoSavings.goal.name}
          target={demoSavings.goal.target}
        />
      </section>

      <Button
        className="mt-8 w-full"
        onClick={() => navigate('/trip/create')}
      >
        Start a shop
      </Button>
    </div>
  )
}
