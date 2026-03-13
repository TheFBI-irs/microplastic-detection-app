interface ResultCardProps {
  title: string
  value: string | number
  subtitle?: string
}

export function ResultCard({ title, value, subtitle }: ResultCardProps) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-lg font-bold text-primary">{value}</div>
      <div className="text-sm text-text/80">{title}</div>
      {subtitle && <div className="text-xs text-text/60 mt-1">{subtitle}</div>}
    </div>
  )
}
