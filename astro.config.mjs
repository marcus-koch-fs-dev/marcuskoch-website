import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  // Dev-only UI, never shipped in `astro build`. Pinned to a corner so it
  // doesn't sit on top of the centered footer links on /.
  devToolbar: {
    placement: "bottom-right",
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/index" as *;`,
        },
      },
    },
  },
});
