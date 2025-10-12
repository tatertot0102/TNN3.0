import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/TNN3.0/", // 👈 ADD THIS LINE
});