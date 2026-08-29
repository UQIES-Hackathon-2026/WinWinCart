type GoalProgressProps = {
  name: string
  current: number
  target: number
}

export function GoalProgress({ name, current, target }: GoalProgressProps) {
  const progress = Math.min(current / target, 1)

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-base font-semibold">{name}</p>
        <p className="tnum text-[13px] text-mute">
          {`$${current.toFixed(0)} of $${target.toFixed(0)}`}
        </p>
      </div>
      <div
        aria-hidden="true"
        className="mt-3 h-2 w-full overflow-hidden bg-rule"
      >
        <div
          className="h-full bg-lime transition-[width] duration-[400ms] ease-[var(--ease-refined)] motion-reduce:transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  )
}
