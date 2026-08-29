import { ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { GoalProgress } from '../components/GoalProgress'
import { SavingsBasket } from '../components/SavingsBasket'
import { HeroFigure, SectionLabel, StatRow } from '../components/ui'
import { demoSavings } from '../data/demo'
import { formatCurrency } from '../lib/format'

export function Home() {
  return (
    <div className="px-5 pb-24 pt-6">
      <div className="flex items-start justify-between gap-4">
        <BrandLockup />
        <div className="flex shrink-0 items-center gap-2">
          <Link
            aria-label="Open cart"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            to="/cart"
          >
            <ShoppingCart size={20} strokeWidth={1.75} />
          </Link>
          <Link
            aria-label="Open profile"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            to="/profile"
          >
            <User size={20} strokeWidth={1.75} />
          </Link>
        </div>
      </div>

      <SavingsBasket
        className="mx-auto mt-6"
        summary={`${formatCurrency(demoSavings.allTimeSaved)} saved. ${demoSavings.equivalenceLine}.`}
      />

      <HeroFigure className="mt-6 text-center">
        {formatCurrency(demoSavings.allTimeSaved)}
      </HeroFigure>
      <p className="mt-2 text-center text-base text-xs text-mute">
        saved vs Coles/Woolworths average
      </p>
      <p className="mt-1 text-center text-[15px] font-semibold">
        {demoSavings.equivalenceLine}
      </p>

      <div className="mt-8 border-t border-rule">
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
      </div>
    </div>
  )
}
