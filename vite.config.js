import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-bpmn",
  plugins: [react()],
  server: {
    proxy: {
      "/diagram": {
        target: "https://cdn.statically.io",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/diagram/, ""),
      },
    },
  },
});
