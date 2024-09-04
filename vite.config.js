import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/sass/base.scss";`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          // Speichert alle Bilddateien in einem 'images'-Ordner im 'assets'-Verzeichnis
          if (/\.(png|jpe?g|gif|svg)$/.test(name ?? "")) {
            return "assets/images/[name].[hash][extname]";
          }
          // Standardverhalten für andere Arten von Assets
          return "assets/[name].[hash][extname]";
        },
        chunkFileNames: "assets/js/[name].[hash].js",
        entryFileNames: "assets/js/[name].[hash].js",
      },
    },
  },
});
