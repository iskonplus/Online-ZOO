import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        landing: resolve(__dirname, "pages/landing/index.html"),
        zoos: resolve(__dirname, "pages/zoos/zoos.html"),
        map: resolve(__dirname, "pages/animal/animal.html"),
        contact: resolve(__dirname, "pages/contact/contact.html"),
      },
    },
  },
});