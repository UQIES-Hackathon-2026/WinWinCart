type SegmentOption<T extends string> = {
  label: string
  value: T
}

type SegmentedControlProps<T extends string> = {
  label: string
  options: readonly SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      aria-label={label}
      className="flex min-h-11 overflow-hidden rounded-xl border border-ink"
      role="group"
    >
      {options.map((option) => {
        const selected = option.value === value

        return (
          <button
            key={option.value}
            aria-pressed={selected}
            className={[
              'min-h-11 flex-1 px-3 text-sm font-semibold',
              'focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-ink',
              selected ? 'bg-lime text-ink' : 'bg-paper text-ink',
            ].join(' ')}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
