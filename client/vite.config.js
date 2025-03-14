import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') }) 

console.log("🔑 VITE_API_KEY:", process.env.VITE_API_KEY);

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
