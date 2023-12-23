export const es = {
  "author.name": "Sebastián Barrenechea",

  "nav.fork": "Hazme fork en GitHub",
  "nav.sr.open": "Abrir el menú de navegación",
  "nav.home": "Inicio",
  "nav.projects": "Proyectos",
  "nav.posts": "Publicaciones",
  "nav.page": "Página",
  "nav.language.select": "Seleccionar idioma",

  "hero.greeting": "Holaa! Soy",
  "hero.description": "Un Ingeniero de Software ubicado en Chile 🇨🇱",
  "hero.doing": "Puedes encontrarme jugando con pruebas de concepto, nuevas tecnologías y explorando el fascinante mundo de los modelos de Machine Learning.",
  "hero.currentEmployment": "Actualmente trabajo en",
  "hero.currentTeam": "con el equipo de DevOps",
  "hero.avatar.alt": "Avatar generado por IA usando",
  "hero.avatar.with": "con",

  "home.recentProjects": "Últimos",
  "home.recentProjects.viewAll": "Ver todos los proyectos",
  "home.recentPosts": "Últimas",
  "home.recentPosts.viewAll": "Ver todas las publicaciones",

  "blog.translatedBy": "Contenido traducido por",

  "posts.paginationDescription": "Resultado de algunos procesos de brain-dumping por los que paso de vez en cuando",
  "posts.by": "Por",
  "posts.on": "el",
  "posts.pagination.older": "Publicaciones anteriores",
  "posts.pagination.newer": "Publicaciones más recientes",

  "projects.paginationDescription": "No necesariamente todo lo que he hecho, pero lo que puedo compartir legalmente 😄",
  "projects.releasedOn": "Lanzado el",
  "projects.go": "Ir",
  "projects.pagination.older": "Proyectos anteriores",
  "projects.pagination.newer": "Proyectos más recientes",

  "tags.CSharp": "C#",
  "tags.DotNet6": ".NET 6.0",
  "tags.Xcode": "Xcode",
  "tags.Containers": "Contenedores",
  "tags.Architecture": "Arquitectura",
  "tags.Pipelines": "Pipelines",
  "tags.TailwindCSS": "Tailwind.css",
  "tags.TypeScript": "TypeScript",
  "tags.WebScraping": "Web Scraping",
  "tags.Blog": "Blog",
  "tags.JavaScript": "JavaScript",
  "tags.AstroJS": "Astro.js",
  "tags.ReverseEngineering": "Ingeniería Inversa",
  "tags.Hardware": "Hardware",
  "tags.Android": "Android",
  "tags.Embedded": "Embebido",
  "tags.undefined": "TAG INDEFINIDO",

  "404.title": "Página no encontrada",
  "404.description": "La página que estás buscando no existe.",
  "404.heading": "Algo falta",
  "404.body": "La página que estás buscando no existe. Es posible que hayas escrito mal la dirección o que la página se haya movido.",
  "404.back": "Volver a la página de inicio",

  "footer.rights": "Todos los derechos reservados",
  "footer.built": "Construido con",
};

export type Translations = typeof es;

export type OptionalTranslations = {
  [Key in keyof Translations]?: Translations[Key];
};
