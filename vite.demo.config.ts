import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Builds the demo app (index.html + src/main.js) for GitHub Pages
export default defineConfig({
  base: '/vue3-memorystats/',
  plugins: [vue()],
  build: {
    outDir: 'dist-demo'
  }
})
