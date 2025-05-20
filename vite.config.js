import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
    base: "",
    plugins: [react(), tailwindcss()],
    build: {
        sourcemap: true, // enable production source maps
    },
    css: {
        devSourcemap: true, // enable CSS source maps during development
    },
});
