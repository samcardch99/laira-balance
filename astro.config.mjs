// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import lenis from "astro-lenis";


import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [lenis(), react(), tailwind(), sanity({
    projectId: "47mfywui",
    dataset: "production",
    useCdn: true, // for static builds
  })],
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },


});