import { es, type OptionalTranslations } from './es.ts';

export const fr: OptionalTranslations = {
  'nav.fork': 'Forkez-moi sur GitHub',
  'nav.sr.open': 'Ouvrir le menu de navigation',
  'nav.home': 'Accueil',
  'nav.projects': 'Projets',
  'nav.posts': 'Articles',
  'nav.page': 'Page',
  'nav.language.select': 'Sélectionner la langue',

  'hero.greeting': 'Salut ! Je suis',
  'hero.description': 'Un ingénieur logiciel situé au Chili 🇨🇱',
  'hero.doing':
    'Vous pouvez me trouver en train de jouer avec des preuves de concept, de nouvelles technologies et d’explorer le monde fascinant des modèles de Machine Learning.',
  'hero.currentEmployment': 'Je travaille actuellement chez',
  'hero.currentTeam': "avec l'équipe DevOps",
  'hero.avatar.alt': 'Avatar généré par IA en utilisant',
  'hero.avatar.with': 'avec',

  'home.recentProjects': 'Derniers',
  'home.recentProjects.viewAll': 'Voir tous les projets',
  'home.recentPosts': 'Récents',
  'home.recentPosts.viewAll': 'Voir toutes les articles',

  'blog.translatedBy': 'Contenu traduit par',

  'posts.paginationDescription':
    'Résultat de certains processus de vidage de cerveau que je fais de temps en temps',
  'posts.by': 'Par',
  'posts.on': 'le',
  'posts.pagination.older': 'Articles précédentes',
  'posts.pagination.newer': 'Articles plus récentes',

  'projects.paginationDescription':
    'Pas nécessairement tout ce que j’ai fait, mais ce que je peux partager légalement 😄',
  'projects.releasedOn': 'Lancé le',
  'projects.go': 'Aller',
  'projects.pagination.older': 'Projets précédents',
  'projects.pagination.newer': 'Projets plus récents',

  'tags.CSharp': 'C#',
  'tags.DotNet6': '.NET 6.0',
  'tags.Xcode': 'Xcode',
  'tags.Containers': 'Conteneurs',
  'tags.Architecture': 'Architecture',
  'tags.Pipelines': 'Pipelines',
  'tags.TailwindCSS': 'Tailwind.css',
  'tags.TypeScript': 'TypeScript',
  'tags.WebScraping': 'Web Scraping',
  'tags.Blog': 'Blog',
  'tags.JavaScript': 'JavaScript',
  'tags.AstroJS': 'Astro.js',
  'tags.ReverseEngineering': 'Ingénierie Inverse',
  'tags.Hardware': 'Matériel',
  'tags.Android': 'Android',
  'tags.Embedded': 'Embarqué',
  'tags.undefined': 'TAG INDÉFINI',

  '404.title': 'Page non trouvée',
  '404.description': "La page que vous recherchez n'existe pas.",
  '404.heading': 'Il manque quelque chose',
  '404.body':
    "La page que vous recherchez n'existe pas. Vous avez peut-être mal tapé l'adresse ou la page a été déplacée.",
  '404.back': "Retourner à la page d'accueil",

  'footer.rights': 'Tous droits réservés',
  'footer.built': 'Construit avec',
};

// Default to Spanish translations if a key is missing
export const frWithFallback: { [Key in keyof typeof es]: string } = new Proxy(fr, {
  get: (target, name: keyof typeof es) => target[name] || es[name],
}) as { [Key in keyof typeof es]: string };
