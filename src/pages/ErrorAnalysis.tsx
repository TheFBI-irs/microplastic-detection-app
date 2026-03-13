import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const confusionData = [
  { name: 'TP', value: 702, color: '#22c55e' },
  { name: 'FP', value: 118, color: '#eab308' },
  { name: 'FN', value: 124, color: '#ef4444' },
  { name: 'TN', value: 10297, color: '#3b82f6' },
]

const errorBreakdown = [
  { name: 'Near Miss', count: 15, color: '#eab308' },
  { name: 'Low Overlap', count: 18, color: '#f97316' },
  { name: 'Hallucination', count: 85, color: '#ef4444' },
]

export function ErrorAnalysis() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Detection Error Analysis</h1>
      <p className="text-text/80 mb-12">Model evaluation and error categorization.</p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 mb-8"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Confusion Matrix</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {confusionData.map((d) => (
            <div key={d.name} className="rounded-xl p-4" style={{ background: `${d.color}20`, borderColor: d.color, borderWidth: 1 }}>
              <div className="text-2xl font-bold" style={{ color: d.color }}>{d.value}</div>
              <div className="text-sm text-text/70">{d.name === 'TP' ? 'True Positives' : d.name === 'FP' ? 'False Positives' : d.name === 'FN' ? 'False Negatives' : 'True Negatives'}</div>
            </div>
          ))}
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={confusionData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" width={40} />
              <Tooltip contentStyle={{ background: '#1e293b', borderRadius: 8 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {confusionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Error Breakdown</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={errorBreakdown} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#1e293b', borderRadius: 8 }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {errorBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
