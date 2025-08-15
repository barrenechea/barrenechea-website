import { es, type OptionalTranslations } from './es.ts';

export const it: OptionalTranslations = {
  'nav.fork': 'Fork su GitHub',
  'nav.sr.open': 'Apri il menu di navigazione',
  'nav.home': 'Home',
  'nav.projects': 'Progetti',
  'nav.posts': 'Post',
  'nav.page': 'Pagina',
  'nav.language.select': 'Seleziona lingua',

  'hero.greeting': 'Ciao! Sono',
  'hero.description':
    'Un Ingegnere del Software e contributore di software open source situato in Cile 🇨🇱',
  'hero.doing':
    'Puoi trovarmi sperimentare con proof of concept, nuove tecnologie ed esplorare il mondo affascinante dei modelli di Machine Learning.',
  'hero.currentEmployment': 'Attualmente lavoro presso',
  'hero.currentTeam': 'con il team di DevOps',
  'hero.lookingFor': 'Attualmente sto cercando nuove opportunità di lavoro',
  'hero.noEmployment': 'Attualmente non sono impiegato',
  'hero.avatar.alt': 'Avatar generato da IA usando',
  'hero.avatar.with': 'con',

  'home.recentProjects': 'Recenti',
  'home.recentProjects.viewAll': 'Vedi tutti i progetti',
  'home.recentPosts': 'Recenti',
  'home.recentPosts.viewAll': 'Vedi tutti i post',

  'blog.translatedBy': 'Contenuto tradotto da',

  'posts.paginationDescription':
    'Risultato di alcuni processi di brain-dumping che faccio di tanto in tanto',
  'posts.by': 'Di',
  'posts.on': 'il',
  'posts.pagination.older': 'Post più vecchi',
  'posts.pagination.newer': 'Post più recenti',

  'projects.paginationDescription':
    'Non necessariamente tutto ciò che ho fatto, ma quello che posso condividere legalmente 😄',
  'projects.releasedOn': 'Pubblicato il',
  'projects.go': 'Vai',
  'projects.pagination.older': 'Progetti precedenti',
  'projects.pagination.newer': 'Progetti più recenti',

  'tags.CSharp': 'C#',
  'tags.DotNet6': '.NET 6.0',
  'tags.Xcode': 'Xcode',
  'tags.Containers': 'Contenitori',
  'tags.Architecture': 'Architettura',
  'tags.Pipelines': 'Pipelines',
  'tags.TailwindCSS': 'Tailwind.css',
  'tags.TypeScript': 'TypeScript',
  'tags.WebScraping': 'Web Scraping',
  'tags.Blog': 'Blog',
  'tags.JavaScript': 'JavaScript',
  'tags.AstroJS': 'Astro.js',
  'tags.ReverseEngineering': 'Ingegneria Inversa',
  'tags.Hardware': 'Hardware',
  'tags.Android': 'Android',
  'tags.Embedded': 'Incorporato',
  'tags.undefined': 'TAG NON DEFINITO',

  '404.title': 'Pagina non trovata',
  '404.description': 'La pagina che stai cercando non esiste.',
  '404.heading': 'Qualcosa manca',
  '404.body':
    "La pagina che stai cercando non esiste. Potresti aver digitato l'indirizzo errato o la pagina potrebbe essere stata spostata.",
  '404.back': 'Torna alla Home',

  'footer.rights': 'Tutti i diritti riservati',
  'footer.built': 'Costruito con',
};

// Default to Spanish translations if a key is missing
export const itWithFallback: { [Key in keyof typeof es]: string } = new Proxy(it, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
