/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/branch-todos/",
  test: {
    globals: true,
    browser: {
      enabled: true,
      instances: [{ browser: "chromium" }],
    },
    coverage: {
      provider: "istanbul",
      include: ["src/components/**"],
    },
  },
});
