import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ahmed-imran.github.io/Ahmed-Imran",
  // site: "https://2ao1.space",
  base: "/Ahmed-Imran",
  output: "static",
  integrations: [react(), sitemap(), tailwind()],

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    // base: "/Ahmed-Imran/",
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
    css: {
      transformer: "postcss",
    },
  },

  compressHTML: true,
});
