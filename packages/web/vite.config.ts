import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Pages are served as real paths (/courses/<id>), so assets need an absolute base.
  base: "/security-education/",
  plugins: [vue(), tailwindcss()],
});
