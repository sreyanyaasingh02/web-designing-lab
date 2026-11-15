import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web-designing-lab/Experiment7-%20React%20Notes%20App/site/',
  build: {
    outDir: 'site',
  },
})