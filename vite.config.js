import { defineConfig } from 'vite'
import uniPkg from '@dcloudio/vite-plugin-uni'

// Use the default export (uniPlugin function) from the CommonJS module
const uni = uniPkg.default

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
})