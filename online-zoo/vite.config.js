import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        landing: "pages/landing/index.html",
        animal: "pages/animal/animal.html",
        map: "pages/map/map.html",
        contact: "pages/contact/contact.html",
        registration: "pages/auth/registration.html",
        signIn: "pages/auth/sign-in.html",
      },
    },
  },
});