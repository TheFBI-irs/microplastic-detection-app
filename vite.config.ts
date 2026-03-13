import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const base = process.env.VITE_BASE_PATH ?? '/microplastic-detection-app/'

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: { manualChunks: { 'react-vendor': ['react', 'react-dom', 'react-router-dom'] } },
    },
  },
})
