import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SectionLabel } from '../components/ui'
import { demoResultQuotes } from '../data/demo'
import { getStoreById } from '../data/stores'
import { formatCurrency } from '../lib/format'
import { useApp } from '../store/useApp'

export function Results() {
  const navigate = useNavigate()
  const optimiseMode = useApp((state) => state.optimiseMode)

  const [topPick, ...runnersUp] = demoResultQuotes
  const topStore = getStoreById(topPick.storeId)
  const pillLabel = optimiseMode === 'time' ? 'Fastest' : 'Best value'

  return (
    <div className="px-5 pb-8 pt-6">
      <button
        aria-label="Back"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        onClick={() => navigate('/trip/create')}
        type="button"
      >
        <ArrowLeft size={20} strokeWidth={1.75} />
      </button>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">Results</h1>

      <section className="hero-surface glass-panel mt-8 min-h-[320px] rounded-3xl p-5">
        <p className="text-2xl font-bold">{topStore?.name}</p>
        <p className="tnum mt-4 text-[32px] font-bold leading-none">
          {formatCurrency(topPick.total)}
        </p>
        <p className="tnum mt-2 text-base font-semibold text-forest">
          {formatCurrency(topPick.savings)} saved vs Coles/Woolworths average
        </p>

        <p className="tnum mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-mute">
          <span className="inline-flex items-center gap-1">
            <MapPin aria-hidden="true" size={16} strokeWidth={1.75} />
            {topPick.distanceKm.toFixed(1)} km
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" size={16} strokeWidth={1.75} />
            {topPick.roundTripMinutes} min round trip
          </span>
          <span>{formatCurrency(topPick.travelCost)} travel</span>
        </p>

        <span className="mt-4 inline-block rounded-xl bg-lime px-3 py-1.5 text-sm font-semibold text-ink">
          {pillLabel}
        </span>

        {topPick.missingItems > 0 && (
          <p className="mt-4 text-[13px] text-mute">
            Missing {topPick.missingItems} items, priced at benchmark
          </p>
        )}
      </section>

      <section className="mt-4 border-t border-rule pt-6">
        <SectionLabel>Other options</SectionLabel>
        <ul className="mt-3">
          {runnersUp.map((quote) => {
            const store = getStoreById(quote.storeId)
            return (
              <li
                key={quote.storeId}
                className="flex min-h-11 items-center justify-between gap-4 border-b border-rule py-3 text-[15px] last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{store?.name}</p>
                  {quote.missingItems > 0 && (
                    <p className="mt-0.5 text-[13px] text-mute">
                      Missing {quote.missingItems} items
                    </p>
                  )}
                </div>
                <div className="tnum shrink-0 text-right">
                  <p className="font-semibold">{formatCurrency(quote.total)}</p>
                  {quote.deltaLabel && (
                    <p className="mt-0.5 text-[13px] text-mute">
                      {quote.deltaLabel}
                    </p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>

      <p className="mt-8 text-[13px] text-mute">
        Rankings use hardcoded demo quotes. Phase 2 will wire the pricing
        engine from design.md.
      </p>
    </div>
  )
}
