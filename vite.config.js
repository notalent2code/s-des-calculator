import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { postcss } from 'daisyui/src/lib/postcss-prefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
