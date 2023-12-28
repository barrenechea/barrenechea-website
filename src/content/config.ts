import { defineCollection, z } from 'astro:content';

const blogBaseSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.date(),
  translatedBy: z.string().optional(),
  img: z.string(), // will be validated by the collection
  imgAlt: z.string(),
});
const postsSchema = blogBaseSchema.extend({
  ogOverride: z.string().optional(),
});
const projectsSchema = blogBaseSchema.extend({
  link: z.string().optional(),
  tags: z.array(z.string()),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: (context) => postsSchema.extend({ img: context.image() }),
});
const projectsCollection = defineCollection({
  type: 'content',
  schema: (context) => projectsSchema.extend({ img: context.image() }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
