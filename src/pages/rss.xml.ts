import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

import { AppConfig } from '~/config';
import { allPages } from '~/content';

const languageTag = (lang: string) => `<language>${lang}</language>`;

export async function GET(context: APIContext) {
  return rss({
    title: AppConfig.siteName,
    description: AppConfig.description,
    site: context.site ?? '',
    items: allPages.map((page) => ({
      link: `/${page.collection}/${page.slug}`,
      title: page.data.title,
      description: page.data.description,
      pubDate: page.data.pubDate,
      customData: languageTag(page.id.split('/')[0]),
    })),
    customData: languageTag(AppConfig.defaultLang),
  });
}
