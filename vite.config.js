// import { reactEasierViteConfig as revc_ } from 'react-easier/vite-config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig(revc_({
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://fullstack-deploy-g3pd.onrender.com:3000',
        changeOrigin: true,
        secure: true
      }
    }
  }
})