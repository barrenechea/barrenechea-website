import { defineCollection, z } from "astro:content";

const postCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    ogOverride: z.string().optional(),
    description: z.string(),
    pubDate: z.date(),
    imgSrc: z.string(),
    imgAlt: z.string(),
    tags: z.array(z.string()),
  }),
});

const projectCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    link: z.string().optional(),
    imgSrc: z.string(),
    imgAlt: z.string(),
  }),
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
