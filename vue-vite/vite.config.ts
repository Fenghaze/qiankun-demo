import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vue-vite', { useDevMode: true })
  ],
  server: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // @指向src目录
    }
  },
})
