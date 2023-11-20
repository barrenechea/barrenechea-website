import { getCollection } from 'astro:content';

export const projectPages = await getCollection('projects');
export const postPages = await getCollection('posts');

export const allPages = [...projectPages, ...postPages];
