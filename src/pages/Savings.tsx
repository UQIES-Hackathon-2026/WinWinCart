import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { HeroFigure, SectionLabel } from '../components/ui'
import { formatCurrency, formatDate, isInCurrentMonth } from '../lib/format'
import { useApp } from '../store/useApp'

const monthlyIncreasePercent = 28.8

export function Savings() {
  const savingsBalance = useApp((state) => state.savingsBalance)
  const weeklyBudget = useApp((state) => state.weeklyBudget)
  const savingsGoal = useApp((state) => state.goal)
  const savingsTransfers = useApp((state) => state.savingsTransfers)
  const monthlySavings = savingsTransfers
    .filter((transfer) => isInCurrentMonth(transfer.paidAt))
    .reduce((total, transfer) => total + transfer.amountSaved, 0)
  const lastMonthSaved =
    monthlySavings / (1 + monthlyIncreasePercent / 100)
  const extraSavedThisMonth = monthlySavings - lastMonthSaved
  const goalProgress =
    savingsGoal.target > 0
      ? Math.min(savingsBalance / savingsGoal.target, 1)
      : 0
  const goalPercentage = Math.round(goalProgress * 100)
  const goalRemaining = Math.max(savingsGoal.target - savingsBalance, 0)
  const [visibleGoalProgress, setVisibleGoalProgress] = useState(0)

  useEffect(() => {
    let progressFrame = 0
    const resetFrame = window.requestAnimationFrame(() => {
      setVisibleGoalProgress(0)
      progressFrame = window.requestAnimationFrame(() => {
        setVisibleGoalProgress(goalProgress)
      })
    })
    return () => {
      window.cancelAnimationFrame(resetFrame)
      window.cancelAnimationFrame(progressFrame)
    }
  }, [goalProgress])

  return (
    <div className="px-5 pb-8 pt-8">
      <h1 className="text-2xl font-bold tracking-tight">Savings</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        Turn what is left in your weekly grocery budget into progress.
      </p>

      <section aria-labelledby="monthly-savings-label" className="mt-8">
        <SectionLabel id="monthly-savings-label">
          Saved this month
        </SectionLabel>
        <HeroFigure className="mt-3">
          {formatCurrency(monthlySavings)}
        </HeroFigure>
        <p className="mt-2 text-[13px] text-mute">
          Moved from your weekly grocery budget
        </p>

        {monthlySavings > 0 ? (
          <div className="mt-5 rounded-xl bg-mint px-4 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2.5">
                <ArrowUpRight
                  aria-hidden="true"
                  className="shrink-0 text-forest"
                  size={21}
                  strokeWidth={2}
                />
                <div>
                  <p className="text-[15px] font-bold text-forest">
                    {monthlyIncreasePercent}% more saved
                  </p>
                  <p className="text-[12px] text-mute">than last month</p>
                </div>
              </div>
              <div className="tnum shrink-0 text-right">
                <p className="text-base font-bold text-forest">
                  +{formatCurrency(extraSavedThisMonth)}
                </p>
                <p className="text-[12px] text-mute">
                  {formatCurrency(lastMonthSaved)} last month
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 border-y border-rule py-4">
            <p className="text-[15px] font-semibold">
              No savings moved this month
            </p>
            <p className="mt-1 text-[13px] leading-5 text-mute">
              Pay for a saved trip from Cart to move the rest of your weekly
              budget here.
            </p>
          </div>
        )}
      </section>

      <section
        aria-labelledby="savings-goal-label"
        className="mt-8 border-t border-rule pt-8"
      >
        <SectionLabel id="savings-goal-label">Saving for</SectionLabel>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-bold">{savingsGoal.name}</h2>
          <p className="tnum shrink-0 text-[13px] text-mute">
            {formatCurrency(savingsGoal.target)} goal
          </p>
        </div>
        <div
          aria-label={`${goalPercentage}% of savings goal complete`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={goalPercentage}
          className="mt-4 h-3 w-full overflow-hidden bg-rule"
          role="progressbar"
        >
          <div
            className="h-full bg-lime transition-[width] duration-[400ms] ease-[var(--ease-refined)] motion-reduce:transition-none"
            style={{ width: `${visibleGoalProgress * 100}%` }}
          />
        </div>
        <dl className="tnum mt-4 grid grid-cols-3 divide-x divide-rule">
          <div className="pr-3">
            <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-mute">
              Saved
            </dt>
            <dd className="mt-1 text-[15px] font-bold">
              {formatCurrency(savingsBalance)}
            </dd>
          </div>
          <div className="px-3 text-center">
            <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-mute">
              Complete
            </dt>
            <dd className="mt-1 text-[15px] font-bold text-forest">
              {goalPercentage}%
            </dd>
          </div>
          <div className="pl-3 text-right">
            <dt className="text-[11px] font-bold uppercase tracking-[0.06em] text-mute">
              Left
            </dt>
            <dd className="mt-1 text-[15px] font-bold">
              {formatCurrency(goalRemaining)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-8 border-t border-rule pt-8">
        <SectionLabel>Weekly budget</SectionLabel>
        <div className="mt-3 flex items-end justify-between gap-4 border-y border-rule py-4">
          <div>
            <p className="text-base font-semibold">Groceries</p>
            <p className="mt-1 text-[13px] text-mute">
              Your current spending limit
            </p>
          </div>
          <div className="tnum shrink-0 text-right">
            <p className="text-xl font-bold">{formatCurrency(weeklyBudget)}</p>
            <p className="text-[12px] text-mute">per week</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <SectionLabel>Savings activity</SectionLabel>
        {savingsTransfers.length === 0 ? (
          <div className="mt-3 border-y border-rule py-4">
            <p className="text-[15px] font-semibold">No activity yet</p>
            <p className="mt-1 text-[13px] text-mute">
              Your first completed payment will appear here.
            </p>
          </div>
        ) : (
          <ul className="mt-3 border-t border-rule">
            {savingsTransfers.map((transfer) => (
              <li
                key={transfer.id}
                className="border-b border-rule py-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[15px] font-semibold">
                      {transfer.storeNames}
                    </p>
                    <p className="mt-1 text-[13px] text-mute">
                      {formatDate(transfer.paidAt.slice(0, 10))} ·{' '}
                      {transfer.itemCount} item
                      {transfer.itemCount === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div className="tnum shrink-0 text-right">
                    <p className="text-[15px] font-semibold">
                      {formatCurrency(transfer.amountSpent)} paid
                    </p>
                    <p className="mt-1 text-[13px] text-forest">
                      +{formatCurrency(transfer.amountSaved)} moved
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
