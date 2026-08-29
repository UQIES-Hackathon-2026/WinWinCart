import { useEffect, useMemo, useState } from 'react'
import {
  Apple,
  Check,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Loader2,
  Plus,
  Wifi,
} from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, SectionLabel } from '../components/ui'
import { formatCurrency } from '../lib/format'
import {
  calculateBudgetSavings,
  useApp,
  type SavedTripPlan,
} from '../store/useApp'

type PaymentStage =
  | 'processing'
  | 'paid'
  | 'transferring'
  | 'complete'
  | 'error'

type WalletLocationState = {
  tripId?: string
}

type PaymentExperienceProps = {
  animatedTransfer: number
  errorMessage: string | null
  goalName: string
  goalTarget: number
  onBackToWallet: () => void
  onViewSavings: () => void
  savingsBeforePayment: number
  stage: PaymentStage
  transferAmount: number
  trip: SavedTripPlan
  weeklyBudget: number
}

function PaymentExperience({
  animatedTransfer,
  errorMessage,
  goalName,
  goalTarget,
  onBackToWallet,
  onViewSavings,
  savingsBeforePayment,
  stage,
  transferAmount,
  trip,
  weeklyBudget,
}: PaymentExperienceProps) {
  const showingTransfer = stage === 'transferring' || stage === 'complete'
  const savingsAfterPayment = savingsBeforePayment + animatedTransfer
  const goalProgress =
    goalTarget > 0 ? Math.min(savingsAfterPayment / goalTarget, 1) : 0
  const storeNames = trip.stores.map((store) => store.name).join(' + ')

  return (
    <div
      className={[
        'absolute inset-0 z-30 flex min-h-full flex-col overflow-y-auto px-5 pb-8 pt-10',
        'transition-colors duration-500 ease-[var(--ease-refined)] motion-reduce:transition-none',
        showingTransfer ? 'bg-forest text-paper' : 'bg-paper text-ink',
      ].join(' ')}
    >
      <p aria-atomic="true" aria-live="polite" className="sr-only" role="status">
        {stage === 'processing' && 'Making payment.'}
        {stage === 'paid' && `Payment made. ${formatCurrency(trip.total)} paid.`}
        {stage === 'transferring' && 'Moving the rest of your weekly budget into savings.'}
        {stage === 'complete' &&
          `Payment complete. ${formatCurrency(transferAmount)} moved into savings.`}
        {stage === 'error' && `Payment not completed. ${errorMessage}`}
      </p>
      {!showingTransfer ? (
        <div className="flex min-h-full flex-1 flex-col items-center text-center">
          <div
            className={[
              'flex h-20 w-20 items-center justify-center rounded-full bg-ink text-paper',
              'transition-transform duration-500 ease-[var(--ease-refined)] motion-reduce:transition-none',
              stage === 'paid' ? 'scale-100' : 'scale-90',
            ].join(' ')}
          >
            {stage === 'processing' ? (
              <Loader2
                aria-hidden="true"
                className="animate-spin motion-reduce:animate-none"
                size={34}
                strokeWidth={2}
              />
            ) : stage === 'error' ? (
              <CircleAlert aria-hidden="true" size={36} strokeWidth={2} />
            ) : (
              <Check aria-hidden="true" size={40} strokeWidth={2.5} />
            )}
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            {stage === 'processing'
              ? 'Making payment'
              : stage === 'error'
                ? 'Payment not completed'
                : 'Payment made'}
          </h1>
          <p className="mt-2 text-[15px] text-mute">
            {stage === 'processing'
              ? 'Confirming your CartGoblin card'
              : stage === 'error'
                ? errorMessage
                : `${formatCurrency(trip.total)} paid successfully`}
          </p>

          <div className="mt-8 w-full rounded-xl border border-rule bg-sunk px-4 py-4 text-left">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-mute">
              Your shop
            </p>
            <div className="mt-2 flex items-baseline justify-between gap-4">
              <p className="min-w-0 text-[15px] font-semibold">{storeNames}</p>
              <p className="tnum shrink-0 text-lg font-bold">
                {formatCurrency(trip.total)}
              </p>
            </div>
          </div>
          {stage === 'error' && (
            <Button className="mt-6 w-full" onClick={onBackToWallet}>
              Back to wallet
            </Button>
          )}
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper text-forest">
              <Check aria-hidden="true" size={25} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-paper/70">
                Payment made
              </p>
              <p className="tnum mt-0.5 text-[14px] font-semibold">
                {formatCurrency(trip.total)} · {storeNames}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-paper/70">
              Moved into savings
            </p>
            <p className="tnum mt-3 font-display text-[64px] leading-none tracking-tight text-lime">
              +{formatCurrency(animatedTransfer)}
            </p>
            <p className="mt-3 text-base leading-6 text-paper/80">
              The money left in your weekly budget is now helping fund your{' '}
              {goalName}.
            </p>
          </div>

          <dl className="tnum mt-8 grid grid-cols-3 divide-x divide-paper/20 border-y border-paper/20 py-4 text-center">
            <div className="pr-3 text-left">
              <dt className="text-[11px] uppercase tracking-[0.06em] text-paper/60">
                Budget
              </dt>
              <dd className="mt-1 text-base font-bold">
                {formatCurrency(weeklyBudget)}
              </dd>
            </div>
            <div className="px-3">
              <dt className="text-[11px] uppercase tracking-[0.06em] text-paper/60">
                Spent
              </dt>
              <dd className="mt-1 text-base font-bold">
                −{formatCurrency(trip.total)}
              </dd>
            </div>
            <div className="pl-3 text-right">
              <dt className="text-[11px] uppercase tracking-[0.06em] text-paper/60">
                Saved
              </dt>
              <dd className="mt-1 text-base font-bold text-lime">
                {formatCurrency(transferAmount)}
              </dd>
            </div>
          </dl>

          <section aria-labelledby="payment-goal-label" className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-semibold" id="payment-goal-label">
                {goalName}
              </p>
              <p className="tnum text-[13px] text-paper/70">
                {formatCurrency(savingsAfterPayment)} of{' '}
                {formatCurrency(goalTarget)}
              </p>
            </div>
            <div
              aria-label={`${Math.round(goalProgress * 100)}% of savings goal complete`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={Math.round(goalProgress * 100)}
              className="mt-3 h-3 w-full overflow-hidden bg-paper/20"
              role="progressbar"
            >
              <div
                className="h-full bg-lime motion-reduce:transition-none"
                style={{ width: `${goalProgress * 100}%` }}
              />
            </div>
          </section>

          {stage === 'complete' && (
            <Button
              className="mt-auto w-full border-paper bg-paper text-forest focus-visible:outline-paper"
              onClick={onViewSavings}
            >
              View savings
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export function Wallet() {
  const location = useLocation()
  const navigate = useNavigate()
  const savedTrips = useApp((state) => state.savedTrips)
  const balance = useApp((state) => state.walletBalance)
  const savingsBalance = useApp((state) => state.savingsBalance)
  const weeklyBudget = useApp((state) => state.weeklyBudget)
  const goal = useApp((state) => state.goal)
  const topUpWallet = useApp((state) => state.topUpWallet)
  const completeTripPayment = useApp((state) => state.completeTripPayment)
  const paymentTripId = (location.state as WalletLocationState | null)?.tripId
  const selectedTrip = useMemo(
    () => savedTrips.find((trip) => trip.id === paymentTripId),
    [paymentTripId, savedTrips],
  )
  const transferAmount = selectedTrip
    ? calculateBudgetSavings(weeklyBudget, selectedTrip.total)
    : 0

  const [paymentStage, setPaymentStage] = useState<PaymentStage | null>(() =>
    paymentTripId && !useApp.getState().paidTripIds.includes(paymentTripId)
      ? 'processing'
      : null,
  )
  const [savingsBeforePayment, setSavingsBeforePayment] =
    useState(savingsBalance)
  const [animatedTransfer, setAnimatedTransfer] = useState(0)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [topUpOpen, setTopUpOpen] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [isAddedToAppleWallet, setIsAddedToAppleWallet] = useState(false)
  const [showSavings, setShowSavings] = useState(false)

  const parsedTopUpAmount = Number(topUpAmount)
  const canTopUp = Number.isFinite(parsedTopUpAmount) && parsedTopUpAmount > 0

  useEffect(() => {
    let startTimer = 0
    let completeTimer = 0

    if (!selectedTrip || useApp.getState().paidTripIds.includes(selectedTrip.id)) {
      startTimer = window.setTimeout(() => {
        setPaymentStage(null)
        setPaymentError(null)
      }, 0)
      return () => window.clearTimeout(startTimer)
    }

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const paidDelay = reduceMotion ? 20 : 650
    const transferDelay = reduceMotion ? 40 : 1450
    const completeDelay = reduceMotion ? 40 : 1550

    startTimer = window.setTimeout(() => {
      setSavingsBeforePayment(useApp.getState().savingsBalance)
      setAnimatedTransfer(0)
      setPaymentError(null)
      setPaymentStage('processing')
    }, 0)

    let paymentCompleted = false
    const paidTimer = window.setTimeout(() => {
      const result = completeTripPayment(selectedTrip.id)
      if (result === 'completed') {
        paymentCompleted = true
        setPaymentStage('paid')
        return
      }

      const message =
        result === 'insufficient-funds'
          ? 'Top up your wallet before paying for this shop.'
          : result === 'weekly-budget-used'
            ? 'This week’s grocery budget has already been settled.'
            : result === 'trip-not-found'
              ? 'This saved trip is no longer available.'
              : 'This trip has already been paid.'
      setPaymentError(message)
      setPaymentStage('error')
    }, paidDelay)
    const transferTimer = window.setTimeout(() => {
      if (!paymentCompleted) return
      setPaymentStage('transferring')
      completeTimer = window.setTimeout(() => {
        setAnimatedTransfer(transferAmount)
        setPaymentStage('complete')
      }, completeDelay)
    }, transferDelay)

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(paidTimer)
      window.clearTimeout(transferTimer)
      window.clearTimeout(completeTimer)
    }
  }, [completeTripPayment, selectedTrip, transferAmount])

  useEffect(() => {
    if (paymentStage !== 'transferring') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const animationFrame = window.requestAnimationFrame(() => {
        setAnimatedTransfer(transferAmount)
      })
      return () => window.cancelAnimationFrame(animationFrame)
    }

    let animationFrame = 0
    const startedAt = performance.now()
    const duration = 1050

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      setAnimatedTransfer(transferAmount * easedProgress)
      if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animationFrame)
  }, [paymentStage, transferAmount])

  function handleTopUp() {
    if (!canTopUp) return
    topUpWallet(parsedTopUpAmount)
    setTopUpAmount('')
    setTopUpOpen(false)
  }

  if (paymentStage && selectedTrip) {
    return (
      <PaymentExperience
        animatedTransfer={animatedTransfer}
        errorMessage={paymentError}
        goalName={goal.name}
        goalTarget={goal.target}
        onBackToWallet={() =>
          navigate('/wallet', { replace: true, state: null })
        }
        onViewSavings={() => navigate('/savings', { replace: true })}
        savingsBeforePayment={savingsBeforePayment}
        stage={paymentStage}
        transferAmount={transferAmount}
        trip={selectedTrip}
        weeklyBudget={weeklyBudget}
      />
    )
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
          <Wifi
            aria-hidden="true"
            className="rotate-90"
            size={23}
            strokeWidth={1.7}
          />
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
            <label
              className="block text-[13px] font-semibold"
              htmlFor="top-up-amount"
            >
              Top-up amount
            </label>
            <div className="mt-2 flex gap-2">
              <div className="flex min-h-11 flex-1 items-center rounded-xl border border-rule bg-paper px-3 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/20">
                <span aria-hidden="true" className="text-mute">
                  $
                </span>
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
              <Button disabled={!canTopUp} type="submit">
                Add money
              </Button>
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
              Your savings are set aside from everyday spending and ready when
              you need them.
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
