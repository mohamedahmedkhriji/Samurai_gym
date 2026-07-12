import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(({ mode }) => {
  const useHttps = mode === 'https'

  return {
    plugins: [react(), ...(useHttps ? [mkcert()] : [])],
    server: {
      host: '0.0.0.0',
      ...(useHttps ? { https: true } : {}),
    },
  }
})
