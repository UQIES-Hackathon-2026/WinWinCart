export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

export function formatSignedCurrency(amount: number): string {
  const prefix = amount >= 0 ? '+' : ''
  return `${prefix}${formatCurrency(amount)}`
}

export function formatDate(isoDate: string): string {
  const date = new Date(`${isoDate}T12:00:00`)
  return date.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
