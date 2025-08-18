import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],

  // Performance optimizations
  build: {
    inlineStylesheets: "auto",
  },

  vite: {
    ssr: {
      noExternal: ["gsap"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            gsap: ["gsap"],
          },
        },
      },
    },
  },

  adapter: node({
    mode: "standalone",
  }),

  // Enable compression
  compressHTML: true,
});
