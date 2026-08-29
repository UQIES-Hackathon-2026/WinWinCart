import { ArrowLeft, Clock, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreBadgeRow } from '../components/StoreBadge'
import type { Chain } from '../data/stores'
import { formatCurrency, formatDate } from '../lib/format'
import { useApp } from '../store/useApp'

const modeLabel: Record<string, string> = {
  price: 'Ranked by price',
  time: 'Ranked by time',
  both: 'Ranked by balance',
}

export function Cart() {
  const navigate = useNavigate()
  const savedTrips = useApp((state) => state.savedTrips)
  const paidTripIds = useApp((state) => state.paidTripIds)
  const removeSavedTrip = useApp((state) => state.removeSavedTrip)

  return (
    <div className="min-h-full bg-sunk px-4 pb-10 pt-7">
      <button
        aria-label="Back to home"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-rule bg-paper"
        onClick={() => navigate('/home')}
        type="button"
      >
        <ArrowLeft size={20} strokeWidth={1.75} />
      </button>

      <h1 className="mt-5 text-2xl font-bold tracking-tight">Cart</h1>
      <p className="mt-1 text-[13px] text-mute">
        Trips you saved from a price comparison.
      </p>

      {savedTrips.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-[15px] font-semibold">No saved trips yet</p>
          <p className="mt-1 text-[13px] text-mute">
            Build a list, compare prices, and save a trip to see it here.
          </p>
          <button
            className="mt-5 min-h-11 rounded-xl border border-forest bg-forest px-5 py-2.5 text-[15px] font-bold text-paper"
            onClick={() => navigate('/shop')}
            type="button"
          >
            Start a shop
          </button>
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {savedTrips.map((trip) => {
            const isPaid = paidTripIds.includes(trip.id)
            return (
              <li key={trip.id} className="relative">
              <Link
                aria-label={
                  isPaid
                    ? `Open Wallet for paid trip to ${trip.stores
                        .map((store) => store.name)
                        .join(' and ')}`
                    : `Open Wallet to pay for ${trip.stores
                        .map((store) => store.name)
                        .join(' and ')}`
                }
                className="block rounded-2xl border border-rule bg-paper p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                state={isPaid ? undefined : { tripId: trip.id }}
                to="/wallet"
              >
                <div className="pr-10">
                  <p className="text-[15px] font-bold">
                    {trip.stores.map((store) => store.name).join(' + ')}
                  </p>
                  <p className="text-[12px] text-mute">
                    {formatDate(trip.savedAt.slice(0, 10))} ·{' '}
                    {trip.itemCount} item{trip.itemCount === 1 ? '' : 's'} ·{' '}
                    {modeLabel[trip.mode]}
                  </p>
                </div>

                <div className="mt-3">
                  <StoreBadgeRow
                    chains={trip.stores.map((store) => store.chain as Chain)}
                    size="sm"
                  />
                </div>

                <dl className="tnum mt-3 space-y-2 text-[15px]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-mute">Groceries</dt>
                    <dd className="font-semibold">
                      {formatCurrency(trip.groceries)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-mute">Travel cost (fuel)</dt>
                    <dd className="font-semibold">
                      {formatCurrency(trip.travelCost)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-rule pt-2">
                    <dt className="font-semibold">Total cost</dt>
                    <dd className="text-base font-bold">
                      {formatCurrency(trip.total)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="flex items-center gap-1 text-mute">
                      <Clock aria-hidden="true" size={15} strokeWidth={1.75} />
                      Travel time
                    </dt>
                    <dd className="font-semibold">
                      {trip.travelMinutes} min round trip
                    </dd>
                  </div>
                </dl>

                <p className="tnum mt-3 rounded-xl bg-mint px-3 py-2 text-[13px] font-semibold text-forest">
                  {isPaid
                    ? 'Payment complete · weekly savings moved'
                    : `${formatCurrency(trip.saved)} saved vs Coles / Woolworths average`}
                </p>
              </Link>
              <button
                aria-label={`Remove saved trip for ${trip.stores
                  .map((store) => store.name)
                  .join(' and ')}`}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                onClick={() => removeSavedTrip(trip.id)}
                type="button"
              >
                <Trash2 size={18} strokeWidth={1.75} />
              </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
