import { es, type OptionalTranslations } from "./es.ts";

export const en: OptionalTranslations = {
  "author.name": "Sebastian Barrenechea",

  "nav.fork": "Fork me on GitHub",
  "nav.projects": "Projects",
  "nav.posts": "Posts",
  "nav.page": "Page",
  "nav.language.select": "Select language",

  "hero.greeting": "Heey! I'm",
  "hero.description": "A Software Engineer located in Chile 🇨🇱",
  "hero.doing": "You can find me playing with proofs-of-concept, blazingly fast new technologies, and exploring the fascinating realm of Machine Learning models.",
  "hero.currentEmployment": "I'm currently working at",
  "hero.currentTeam": "with the DevOps Team",
  "hero.avatar.alt": "AI-generated avatar using",
  "hero.avatar.with": "with",

  "home.recentProjects": "Recent",
  "home.recentProjects.viewAll": "View all projects",
  "home.recentPosts": "Recent",
  "home.recentPosts.viewAll": "View all posts",

  "blog.translatedBy": "Content translated by",

  "posts.paginationDescription": "Result of some brain-dumping processes that I go through from time to time",
  "posts.by": "By",
  "posts.on": "on",
  "posts.pagination.older": "Older posts",
  "posts.pagination.newer": "Newer posts",

  "projects.paginationDescription": "Not necessarily everything I've done, but what I'm legally allowed to share 😄",
  "projects.releasedOn": "Released on",
  "projects.go": "Go",
  "projects.pagination.older": "Older projects",
  "projects.pagination.newer": "Newer projects",

  "tags.Containers": "Containers",
  "tags.Architecture": "Architecture",
  "tags.ReverseEngineering": "Reverse Engineering",
  "tags.Embedded": "Embedded",
  "tags.undefined": "undefined TAG",

  "404.title": "Page not found",
  "404.description": "The page you are looking for does not exist.",
  "404.heading": "Something's missing",
  "404.body": "The page you are looking for does not exist. You may have mistyped the address or the page may have moved.",
  "404.back": "Go back to the homepage",

  "footer.rights": "All rights reserved",
  "footer.built": "Built with",
};

// Default to Spanish translations if a key is missing
export const enWithFallback: { [Key in keyof typeof es]: string } = new Proxy(
  en,
  {
    get: (target, name: keyof typeof es) => target[name] || es[name],
  }
) as { [Key in keyof typeof es]: string };
