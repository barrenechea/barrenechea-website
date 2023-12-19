import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://www.barrenechea.cl/",
  output: "static",
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
    },
  },
  integrations: [
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    robotsTxt(),
  ],
  // i18n: {
  //   defaultLocale: "es",
  //   locales: ["en", "es"],
  //   routing: {
  //       prefixDefaultLocale: true
  //   }
  // }
  // experimental: {
  //   contentCollectionCache: true,
  // },
});
