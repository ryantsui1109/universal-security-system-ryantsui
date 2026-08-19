import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { resolve } from "path";
import { sign } from "crypto";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    base: command=="build"?"/login/":"/",
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
          login: resolve(import.meta.dirname, "login.html"),
          profile: resolve(import.meta.dirname, "profile.html"),
          signup: resolve(import.meta.dirname, "signup.html"),
        },
      },
    },
  };
});
