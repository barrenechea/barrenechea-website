import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { allPages } from "~/content";
import { AppConfig } from "~/utils/AppConfig";

const customData = "<language>en-us</language>";

export async function GET(context: APIContext) {
  return rss({
    title: AppConfig.siteName,
    description: AppConfig.description,
    site: context.site as URL,
    items: allPages.map((page) => ({
      link: `/${page.collection}/${page.slug}`,
      title: page.data.title,
      description: page.data.description,
      pubDate: page.data.pubDate,
      customData,
    })),
    customData,
  });
}
