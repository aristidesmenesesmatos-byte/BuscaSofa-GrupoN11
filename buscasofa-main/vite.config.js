import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Necesario para que Docker exponga el servidor
    port: 5173,
    proxy: {
      // Redirige /api/* al backend dentro de la red Docker
      // Así el frontend no necesita llamar a http://localhost:4000
      '/api': {
        target: 'http://backend:4000',
        changeOrigin: true,
      },
    },
  },
  // base: '/buscasofa/',  // Descomenta solo si despliegas en subruta
})
