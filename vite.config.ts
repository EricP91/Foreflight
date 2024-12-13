import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/airports": "https://qa.foreflight.com/",
      "/weather": "https://qa.foreflight.com/",
    },
  },
  define: {
    "process.env": {}, // Avoid using `process.env` in browser contexts
  },
});
