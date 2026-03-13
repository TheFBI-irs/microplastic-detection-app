import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Exact', value: 50, color: '#22c55e' },
  { name: 'Overcounted', value: 36, color: '#eab308' },
  { name: 'Undercounted', value: 26, color: '#ef4444' },
]

export function CountAccuracyChart() {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Particle Count Accuracy</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-sm text-text/70">
        Exact: 50 images • Overcounted: 36 • Undercounted: 26
      </p>
    </div>
  )
}
