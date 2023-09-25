import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) => z.object({
    title: z.string(),
    ogOverride: z.string().optional(),
    description: z.string(),
    pubDate: z.date(),
    img: image(),
    imgAlt: z.string(),
  }),
});

const projectsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    link: z.string().optional(),
    img: image(),
    imgAlt: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
