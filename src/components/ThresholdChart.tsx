import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

const data = [
  { threshold: 0.1, precision: 0.72, recall: 0.94, f1: 0.82 },
  { threshold: 0.2, precision: 0.78, recall: 0.91, f1: 0.84 },
  { threshold: 0.3, precision: 0.83, recall: 0.88, f1: 0.855 },
  { threshold: 0.35, precision: 0.856, recall: 0.849, f1: 0.853 },
  { threshold: 0.4, precision: 0.87, recall: 0.82, f1: 0.845 },
  { threshold: 0.5, precision: 0.89, recall: 0.76, f1: 0.82 },
  { threshold: 0.6, precision: 0.91, recall: 0.68, f1: 0.78 },
  { threshold: 0.7, precision: 0.93, recall: 0.58, f1: 0.72 },
]

export function ThresholdChart() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Threshold vs Precision / Recall / F1</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="threshold" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} domain={[0.5, 1]} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <ReferenceLine x={0.35} stroke="#00E5FF" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="precision" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="recall" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="f1" stroke="#eab308" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-text/70">
        Optimal threshold: <strong className="text-primary">0.35</strong> — balances precision and recall.
      </p>
    </div>
  )
}
