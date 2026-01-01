import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-8gua.onrender.com/',  // ← your Render URL
        changeOrigin: true,
        secure: false
      }
    }
  }
})
