import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    port: 3601,
    proxy: {
      "/api": {
        target: "http://localhost:3801",
        autoRewrite: true,
        changeOrigin: true,
      },
    },
  },
  build: {
    rolldownOptions: {
      input: {
        login: resolve(import.meta.dirname, "index.html"),
      },
    },
  },
});
