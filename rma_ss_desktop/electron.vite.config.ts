import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), envCompatible()],
    resolve: {
      alias: {
        "@/lib": resolve('src/main/lib'),
        "@shared": resolve('src/shared')
      }
    },
    define: {
      'process.env.MAIN_VITE_DATABASE_URL': JSON.stringify(process.env.MAIN_VITE_DATABASE_URL),
      'process.env.MAIN_VITE_AUTH_SECRET': JSON.stringify(process.env.MAIN_VITE_AUTH_SECRET)
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin(), envCompatible()]
  },
  renderer: {
    assetsInclude: "src/renderer/assets/**",
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/components': resolve('src/renderer/src/components'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/pages': resolve('src/renderer/src/pages'),
      }
    },
    plugins: [react(), envCompatible()]
  }
})
