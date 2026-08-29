import { useState } from 'react'
import { Apple, Check, ChevronDown, ChevronUp, Plus, Wifi } from 'lucide-react'
import { Button, SectionLabel } from '../components/ui'
import { formatCurrency } from '../lib/format'

const startingBalance = 426.8
const savingsBalance = 142.6

export function Wallet() {
  const [balance, setBalance] = useState(startingBalance)
  const [topUpOpen, setTopUpOpen] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [isAddedToAppleWallet, setIsAddedToAppleWallet] = useState(false)
  const [showSavings, setShowSavings] = useState(false)

  const parsedTopUpAmount = Number(topUpAmount)
  const canTopUp = Number.isFinite(parsedTopUpAmount) && parsedTopUpAmount > 0

  function handleTopUp() {
    if (!canTopUp) return
    setBalance((current) => current + parsedTopUpAmount)
    setTopUpAmount('')
    setTopUpOpen(false)
  }

  return (
    <div className="px-5 pb-8 pt-8">
      <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
      <p className="mt-3 text-base leading-6 text-mute">
        Your spending money and savings, all in one place.
      </p>

      <section
        aria-label="CartGoblin payment card"
        className="mt-8 overflow-hidden rounded-2xl bg-forest px-5 py-5 text-paper shadow-[0_12px_24px_rgba(8,78,70,0.18)]"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="font-display text-xl tracking-tight">CartGoblin</p>
          <Wifi aria-hidden="true" className="rotate-90" size={23} strokeWidth={1.7} />
        </div>
        <div className="mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-paper/70">
            Money in account
          </p>
          <p className="tnum mt-1 text-3xl font-bold tracking-tight">
            {formatCurrency(balance)}
          </p>
        </div>
        <p className="tnum mt-7 text-[15px] tracking-[0.16em]">•••• 4582</p>
        <div className="mt-2 flex items-end justify-between gap-4 text-[11px] uppercase tracking-[0.08em] text-paper/70">
          <p>CartGoblin member</p>
          <p>08/29</p>
        </div>
      </section>

      <section className="mt-8">
        <SectionLabel>Quick actions</SectionLabel>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Button
            aria-expanded={topUpOpen}
            className="flex items-center justify-center gap-2"
            onClick={() => setTopUpOpen((open) => !open)}
          >
            <Plus aria-hidden="true" size={19} strokeWidth={2} />
            Top up
          </Button>
          <Button
            aria-label={
              isAddedToAppleWallet
                ? 'Added to Apple Wallet'
                : 'Add card to Apple Wallet'
            }
            className="flex items-center justify-center gap-2"
            onClick={() => setIsAddedToAppleWallet(true)}
            variant="secondary"
          >
            {isAddedToAppleWallet ? (
              <Check aria-hidden="true" size={18} strokeWidth={2} />
            ) : (
              <Apple aria-hidden="true" size={19} strokeWidth={2} />
            )}
            {isAddedToAppleWallet ? 'Added' : 'Add to Apple Wallet'}
          </Button>
        </div>

        {topUpOpen && (
          <form
            className="mt-3 rounded-xl border border-rule bg-sunk p-4"
            onSubmit={(event) => {
              event.preventDefault()
              handleTopUp()
            }}
          >
            <label className="block text-[13px] font-semibold" htmlFor="top-up-amount">
              Top-up amount
            </label>
            <div className="mt-2 flex gap-2">
              <div className="flex min-h-11 flex-1 items-center rounded-xl border border-rule bg-paper px-3 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/20">
                <span aria-hidden="true" className="text-mute">$</span>
                <input
                  autoFocus
                  className="tnum min-w-0 flex-1 bg-transparent pl-1 text-base outline-none"
                  id="top-up-amount"
                  inputMode="decimal"
                  min="0.01"
                  onChange={(event) => setTopUpAmount(event.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                  value={topUpAmount}
                />
              </div>
              <Button disabled={!canTopUp} type="submit">Add money</Button>
            </div>
          </form>
        )}
      </section>

      <section className="mt-8 border-y border-rule">
        <button
          aria-expanded={showSavings}
          className="flex min-h-20 w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          onClick={() => setShowSavings((shown) => !shown)}
          type="button"
        >
          <div>
            <p className="text-base font-semibold">Savings account</p>
            <p className="tnum mt-1 text-[13px] text-mute">
              {formatCurrency(savingsBalance)} available
            </p>
          </div>
          <span className="flex items-center gap-1 text-[13px] font-semibold text-forest">
            Check savings
            {showSavings ? (
              <ChevronUp aria-hidden="true" size={18} />
            ) : (
              <ChevronDown aria-hidden="true" size={18} />
            )}
          </span>
        </button>
        {showSavings && (
          <div className="border-t border-rule py-4">
            <p className="text-[15px] leading-6 text-mute">
              Your savings are set aside from everyday spending and ready when you need them.
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-[13px] text-mute">Available balance</p>
              <p className="tnum text-[15px] font-semibold">
                {formatCurrency(savingsBalance)}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
