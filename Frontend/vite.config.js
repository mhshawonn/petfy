import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change this to your desired port number
  },
  define: {
    global: 'window',
  },
  build: {
    rollupOptions: {
      plugins: [new NodePolyfillPlugin()],
    },
  },
})
