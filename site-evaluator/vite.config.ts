import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import copy from "rollup-plugin-copy";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),copy({
    targets: [
      { 
        src: 'public/*',  // Changed from images/**/* to images/* for direct files
        dest: 'dist/public/' // Changed to create an images subdirectory in dist
      }
    ],
    hook: 'writeBundle', // Ensure copying happens after bundle is written
    verbose: true // Add logging to help debug
  })],
})
