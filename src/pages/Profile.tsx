import { ArrowLeft, Bus, Car, Footprints } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, SectionLabel } from '../components/ui'
import { ThemePicker } from '../components/ThemePicker'
import { useApp, type Transport } from '../store/useApp'

const transportOptions: {
  value: Transport
  label: string
  icon: typeof Car
}[] = [
  { value: 'car', label: 'Car', icon: Car },
  { value: 'bus', label: 'Bus', icon: Bus },
  { value: 'walk', label: 'Walk', icon: Footprints },
]

export function Profile() {
  const navigate = useNavigate()
  const suburb = useApp((state) => state.suburb)
  const theme = useApp((state) => state.theme)
  const transport = useApp((state) => state.transport)
  const litresPer100km = useApp((state) => state.litresPer100km)
  const timeValuePerHour = useApp((state) => state.timeValuePerHour)
  const weeklyBudget = useApp((state) => state.weeklyBudget)
  const goal = useApp((state) => state.goal)
  const setTransport = useApp((state) => state.setTransport)
  const setLitresPer100km = useApp((state) => state.setLitresPer100km)
  const setTimeValuePerHour = useApp((state) => state.setTimeValuePerHour)
  const setWeeklyBudget = useApp((state) => state.setWeeklyBudget)
  const setGoal = useApp((state) => state.setGoal)
  const setTheme = useApp((state) => state.setTheme)
  const resetDemo = useApp((state) => state.resetDemo)

  return (
    <div className="page-container page-profile pb-8 pt-6">
      <button
        aria-label="Back to home"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        onClick={() => navigate('/home')}
        type="button"
      >
        <ArrowLeft size={20} strokeWidth={1.75} />
      </button>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">Profile</h1>

      <section className="glass-panel mt-8 rounded-2xl p-4">
        <ThemePicker onChange={setTheme} value={theme} />
      </section>

      <section className="mt-8">
        <SectionLabel>About you</SectionLabel>
        <dl className="mt-3 space-y-3">
          <div className="flex justify-between gap-4 border-b border-rule pb-3">
            <dt className="text-[15px] font-semibold">Suburb</dt>
            <dd className="tnum text-[15px]">{suburb}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-rule pb-3">
            <dt className="text-[15px] font-semibold">Transport</dt>
            <dd className="text-[15px] capitalize">{transport}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-8">
        <SectionLabel>Transport</SectionLabel>
        <div
          aria-label="Transport mode"
          className="mt-3 flex gap-2"
          role="group"
        >
          {transportOptions.map(({ value, label, icon: Icon }) => {
            const selected = transport === value
            return (
              <button
                key={value}
                aria-pressed={selected}
                className={[
                  'flex min-h-11 flex-1 flex-col items-center justify-center gap-1 rounded-xl border text-sm font-semibold',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest',
                  selected
                    ? 'border-forest bg-forest text-paper'
                    : 'border-ink bg-transparent text-ink',
                ].join(' ')}
                onClick={() => setTransport(value)}
                type="button"
              >
                <Icon size={20} strokeWidth={1.75} />
                {label}
              </button>
            )
          })}
        </div>

        {transport === 'car' && (
          <label className="mt-4 block">
            <span className="text-[13px] font-semibold text-mute">
              Litres per 100 km
            </span>
            <input
              className="tnum mt-2 min-h-11 w-full rounded-xl border border-ink bg-paper px-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              inputMode="decimal"
              min={1}
              step={0.5}
              type="number"
              value={litresPer100km}
              onChange={(event) =>
                setLitresPer100km(Number(event.target.value) || 8)
              }
            />
          </label>
        )}
      </section>

      <section className="mt-8">
        <SectionLabel>Preferences</SectionLabel>
        <label className="mt-3 block border-b border-rule pb-4">
          <span className="text-[13px] font-semibold text-mute">
            What an hour of your time is worth
          </span>
          <div className="mt-2 flex items-center gap-3">
            <input
              aria-valuetext={`$${timeValuePerHour} per hour`}
              className="flex-1 accent-forest"
              max={60}
              min={10}
              step={1}
              type="range"
              value={timeValuePerHour}
              onChange={(event) =>
                setTimeValuePerHour(Number(event.target.value))
              }
            />
            <span className="tnum min-w-14 text-right text-[15px] font-semibold">
              ${timeValuePerHour}/hr
            </span>
          </div>
        </label>

        <label className="mt-4 block border-b border-rule pb-4">
          <span className="text-[13px] font-semibold text-mute">
            Weekly grocery budget
          </span>
          <input
            className="tnum mt-2 min-h-11 w-full rounded-xl border border-ink bg-paper px-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            inputMode="decimal"
            min={0}
            step={10}
            type="number"
            value={weeklyBudget}
            onChange={(event) =>
              setWeeklyBudget(Number(event.target.value) || 0)
            }
          />
        </label>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-[13px] font-semibold text-mute">
              Savings goal name
            </span>
            <input
              className="mt-2 min-h-11 w-full rounded-xl border border-ink bg-paper px-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              type="text"
              value={goal.name}
              onChange={(event) =>
                setGoal({ ...goal, name: event.target.value })
              }
            />
          </label>
          <label className="block">
            <span className="text-[13px] font-semibold text-mute">
              Goal target
            </span>
            <input
              className="tnum mt-2 min-h-11 w-full rounded-xl border border-ink bg-paper px-4 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              inputMode="decimal"
              min={0}
              step={10}
              type="number"
              value={goal.target}
              onChange={(event) =>
                setGoal({ ...goal, target: Number(event.target.value) || 0 })
              }
            />
          </label>
        </div>
      </section>

      <section className="mt-8 border-t border-rule pt-8">
        <SectionLabel>Developer</SectionLabel>
        <p className="mt-3 text-base leading-6 text-mute">
          Reset demo data or preview the design system.
        </p>
        <div className="mt-4 space-y-3">
          <Button className="w-full" variant="secondary" onClick={resetDemo}>
            Reset demo data
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => navigate('/kitchen-sink')}
          >
            Design system
          </Button>
        </div>
      </section>
    </div>
  )
}
