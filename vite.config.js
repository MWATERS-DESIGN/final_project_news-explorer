import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/final_project_news-explorer/",
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
  },
});
