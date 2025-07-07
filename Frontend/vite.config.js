import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api/v1/users':'http://localhost:3000',
      '/api/v1/userProfile':'http://localhost:3000',
    },
  },
  plugins: [react(),tailwindcss()]
})
