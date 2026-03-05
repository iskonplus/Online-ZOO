import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        landing: "pages/landing/index.html",
        zoos: "pages/zoos/index.html",
        map: "pages/animal/animal.html",
      },
    },
  },
});