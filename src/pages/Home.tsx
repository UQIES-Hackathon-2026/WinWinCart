import { ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandLockup } from '../components/BrandLockup'
import { GoalProgress } from '../components/GoalProgress'
import { SavingsBasket } from '../components/SavingsBasket'
import { HeroFigure, SectionLabel, StatRow } from '../components/ui'
import { formatCurrency, isInCurrentMonth } from '../lib/format'
import { useApp } from '../store/useApp'

export function Home() {
  const weeklyBudget = useApp((state) => state.weeklyBudget)
  const savingsBalance = useApp((state) => state.savingsBalance)
  const savingsGoal = useApp((state) => state.goal)
  const savingsTransfers = useApp((state) => state.savingsTransfers)
  const currentMonthTransfers = savingsTransfers.filter((transfer) =>
    isInCurrentMonth(transfer.paidAt),
  )
  const thisMonthSaved = currentMonthTransfers.reduce(
    (total, transfer) => total + transfer.amountSaved,
    0,
  )
  const thisMonthSpent = currentMonthTransfers.reduce(
    (total, transfer) => total + transfer.amountSpent,
    0,
  )
  const lastTransfer = savingsTransfers[0]?.amountSaved ?? 0

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
        summary={`Current weekly grocery budget: ${formatCurrency(weeklyBudget)}.`}
      />

      <HeroFigure className="mt-6 text-center">
        {formatCurrency(weeklyBudget)}
      </HeroFigure>
      <p className="mt-2 text-center text-xs text-mute">
        current weekly grocery budget
      </p>
      <p className="mt-1 text-center text-[15px] font-semibold">
        {savingsBalance > 0
          ? `Your ${savingsGoal.name} fund is growing`
          : `Your next shop can start your ${savingsGoal.name} fund`}
      </p>

      <div className="mt-8 border-t border-rule">
        <div className="border-b border-rule py-4">
          <SectionLabel>My goal</SectionLabel>
          <div className="mt-3">
            <GoalProgress
              current={savingsBalance}
              name={savingsGoal.name}
              target={savingsGoal.target}
            />
          </div>
        </div>
        <StatRow
          label="This month saved"
          value={formatCurrency(thisMonthSaved)}
        />
        <StatRow
          label="This month spent"
          value={formatCurrency(thisMonthSpent)}
        />
        <StatRow
          label="Last shop saved"
          value={formatCurrency(lastTransfer)}
        />
      </div>
    </div>
  )
}
