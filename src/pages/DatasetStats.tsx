import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Simulated particles-per-image distribution
const distribution = [
  { range: '0-2', count: 45 },
  { range: '3-5', count: 120 },
  { range: '6-10', count: 180 },
  { range: '11-15', count: 95 },
  { range: '16-20', count: 42 },
  { range: '21+', count: 28 },
]

export function DatasetStats() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">Dataset Statistics</h1>
      <p className="text-text/80 mb-12">Overview of the training and evaluation dataset.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-xl p-6 text-center"
        >
          <div className="text-3xl font-bold text-primary">1,023</div>
          <div className="text-sm text-text/70">Total Images</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-xl p-6 text-center"
        >
          <div className="text-3xl font-bold text-primary">112</div>
          <div className="text-sm text-text/70">Test Images</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 text-center"
        >
          <div className="text-3xl font-bold text-primary">826</div>
          <div className="text-sm text-text/70">Total Particles</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-xl p-6 text-center"
        >
          <div className="text-3xl font-bold text-primary">~0.8</div>
          <div className="text-sm text-text/70">Avg per Image</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-8"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">Particles per Image Distribution</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="range" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#1e293b', borderRadius: 8 }} />
              <Bar dataKey="count" fill="#00E5FF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
