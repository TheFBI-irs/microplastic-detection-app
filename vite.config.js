import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get base path from environment variable (for GitHub Pages subdirectory deployment)
const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base: base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild (default, faster, no extra dependencies)
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'tfjs-vendor': ['@tensorflow/tfjs']
        }
      }
    }
  }
})

