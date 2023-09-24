import { defineCollection } from "astro:content";

const postCollection = defineCollection({
  /* ... */
});
const projectCollection = defineCollection({
  /* ... */
});

export const collections = {
  post: postCollection,
  project: projectCollection,
};
