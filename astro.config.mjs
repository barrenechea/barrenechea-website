import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.barrenechea.cl/',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
    },
  },
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    mdx(),
    sitemap(),
    tailwind({ config: { applyBaseStyles: false } }),
    compress({ img: false }),
    robotsTxt(),
  ],
});
