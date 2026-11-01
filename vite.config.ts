import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  publicDir: false,
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/js/vMemoryStats.js', import.meta.url)),
      name: 'vMemoryStats',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'vue3-memorystats.es.js' : 'vue3-memorystats.umd.cjs')
    },
    rollupOptions: {
      external: ['vue'],
      output: { globals: { vue: 'Vue' } }
    }
  }
})
