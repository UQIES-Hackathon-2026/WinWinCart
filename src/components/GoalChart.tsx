import type { CSSProperties } from 'react'

export type GoalChartType = 'donut' | 'bar' | 'pie'

type GoalChartProps = {
  name: string
  current: number
  target: number
  chartType: GoalChartType
  onChartTypeChange: (chartType: GoalChartType) => void
}

const chartOptions: { label: string; value: GoalChartType }[] = [
  { label: 'Donut chart', value: 'donut' },
  { label: 'Bar chart', value: 'bar' },
  { label: 'Pie chart', value: 'pie' },
]

function clampProgress(current: number, target: number) {
  if (target <= 0) return 0
  return Math.min(Math.max(current / target, 0), 1)
}

function DonutChart({ progress }: { progress: number }) {
  const radius = 76
  const circumference = 2 * Math.PI * radius

  return (
    <svg
      aria-hidden="true"
      className="goal-chart-svg"
      viewBox="0 0 200 200"
    >
      <circle
        className="goal-chart-track"
        cx="100"
        cy="100"
        fill="none"
        r={radius}
        stroke="var(--rule)"
        strokeWidth="18"
      />
      <circle
        className="goal-chart-value"
        cx="100"
        cy="100"
        fill="none"
        r={radius}
        stroke="var(--forest)"
        strokeDasharray={`${progress * circumference} ${circumference}`}
        strokeLinecap="round"
        strokeWidth="18"
        transform="rotate(-90 100 100)"
      />
    </svg>
  )
}

function PieChart({ progress }: { progress: number }) {
  return (
    <div
      aria-hidden="true"
      className="goal-pie-chart"
      style={{
        '--goal-progress': `${progress * 100}%`,
      } as CSSProperties}
    />
  )
}

function BarChart({ progress }: { progress: number }) {
  return (
    <div aria-hidden="true" className="goal-bar-chart">
      <div className="goal-bar-track">
        <div
          className="goal-bar-value"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="goal-bar-ticks">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )
}

export function GoalChart({
  name,
  current,
  target,
  chartType,
  onChartTypeChange,
}: GoalChartProps) {
  const progress = clampProgress(current, target)
  const percentage = Math.round(progress * 100)
  const remaining = Math.max(target - current, 0)

  return (
    <section className="goal-chart-section" aria-labelledby="goal-chart-title">
      <div className="goal-chart-header">
        <div>
          <p className="section-label">Goal visualiser</p>
          <h2 className="goal-chart-title" id="goal-chart-title">
            {name}
          </h2>
        </div>
        <label className="goal-chart-select-label">
          <span className="sr-only">Chart type</span>
          <select
            aria-label="Chart type"
            className="goal-chart-select"
            value={chartType}
            onChange={(event) =>
              onChartTypeChange(event.target.value as GoalChartType)
            }
          >
            {chartOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="goal-chart-body">
        <div
          aria-label={`${percentage}% of savings goal reached`}
          className="goal-chart-visual"
          role="img"
        >
          {chartType === 'donut' && <DonutChart progress={progress} />}
          {chartType === 'pie' && <PieChart progress={progress} />}
          {chartType === 'bar' && <BarChart progress={progress} />}
          {chartType === 'donut' && (
            <div className="goal-chart-center">
              <strong>{percentage}%</strong>
              <span>complete</span>
            </div>
          )}
        </div>

        <div className="goal-chart-summary">
          <p className="goal-chart-amount">${current.toFixed(0)}</p>
          <p className="goal-chart-caption">
            of ${target.toFixed(0)} goal
          </p>
          <div className="goal-chart-legend">
            <span>
              <i className="goal-legend-dot goal-legend-dot-current" />
              Saved so far
            </span>
            <span>
              <i className="goal-legend-dot goal-legend-dot-remaining" />
              ${remaining.toFixed(0)} to go
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
