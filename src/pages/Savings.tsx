import { GoalProgress } from '../components/GoalProgress'
import { HeroFigure, SectionLabel, StatRow } from '../components/ui'
import { demoSavings, demoTrips, formatTripStoreName } from '../data/demo'
import { formatCurrency, formatDate } from '../lib/format'

export function Savings() {
  const budgetProgress = Math.min(
    demoSavings.thisMonthSpent / demoSavings.goal.target,
    1,
  )

  return (
    <div className="px-5 pb-8 pt-8">
      <h1 className="text-2xl font-bold tracking-tight">Savings</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        Every dollar saved against the big two, tracked over time.
      </p>

      <HeroFigure className="mt-8">
        {formatCurrency(demoSavings.allTimeSaved)}
      </HeroFigure>
      <p className="mt-2 text-[13px] text-mute">
        All time saved vs Coles/Woolworths average
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
      </div>

      <section className="mt-8">
        <SectionLabel>Monthly budget</SectionLabel>
        <div className="mt-3">
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-base font-semibold">Weekly grocery budget</p>
            <p className="tnum text-[13px] text-mute">
              {formatCurrency(demoSavings.thisMonthSpent)} spent this month
            </p>
          </div>
          <div
            aria-hidden="true"
            className="mt-3 h-2 w-full overflow-hidden bg-rule"
          >
            <div
              className="h-full bg-lime transition-[width] duration-[400ms] ease-[var(--ease-refined)] motion-reduce:transition-none"
              style={{ width: `${budgetProgress * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <GoalProgress
          current={demoSavings.goal.current}
          name={demoSavings.goal.name}
          target={demoSavings.goal.target}
        />
      </section>

      <section className="mt-8">
        <SectionLabel>Trip history</SectionLabel>
        <ul className="mt-3 border-t border-rule">
          {demoTrips.map((trip) => (
            <li
              key={trip.id}
              className="border-b border-rule py-4 last:border-b-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px] font-semibold">
                    {formatTripStoreName(trip.storeId)}
                  </p>
                  <p className="mt-1 text-[13px] text-mute">
                    {formatDate(trip.date)} · {trip.itemCount} items
                  </p>
                </div>
                <div className="tnum shrink-0 text-right">
                  <p className="text-[15px] font-semibold">
                    {formatCurrency(trip.spend)}
                  </p>
                  <p className="mt-1 text-[13px] text-forest">
                    {formatCurrency(trip.savings)} saved
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
