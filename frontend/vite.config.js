import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://backend:8000", // Changed from localhost to backend service name
        changeOrigin: true,
      },
    },
  },
});
