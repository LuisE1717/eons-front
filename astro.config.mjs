import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  integrations: [mdx(), sitemap(), tailwind(), react(), auth()],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "ar", "fr", "it", "hi", "ja", "pt", "ru", "zh"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  adapter: vercel({
    webAnalytics: { enabled: true}
  }),
});
