import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/static/market/cards": {
        target: "http://localhost:8082",
        changeOrigin: true,
      },
    },
  },
});
