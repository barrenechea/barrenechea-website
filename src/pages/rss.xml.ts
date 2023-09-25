import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

import { AppConfig } from "@/utils/AppConfig";

const customData = "<language>en-us</language>";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");
  const projects = await getCollection("projects");
  const mdx = [...posts, ...projects];

  return rss({
    title: AppConfig.siteName,
    description: AppConfig.description,
    site: context.site as URL,
    items: mdx.map((post) => ({
      link: `/${post.collection}/${post.slug}`,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      customData,
    })),
    customData,
  });
}
