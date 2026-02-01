import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: '/rhackoon-central/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        popup: 'empty.html',
        radio: 'grannyRadio.html',
      },
    },
  },
})
