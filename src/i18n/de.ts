import { es, type OptionalTranslations } from './es.ts';

export const de: OptionalTranslations = {
  'author.name': 'Sebastian Barrenechea',

  'nav.fork': 'Fork mich auf GitHub',
  'nav.sr.open': 'Navigationsmenü öffnen',
  'nav.home': 'Startseite',
  'nav.projects': 'Projekte',
  'nav.posts': 'Beiträge',
  'nav.page': 'Seite',
  'nav.language.select': 'Sprache wählen',

  'hero.greeting': 'Hey! Ich bin',
  'hero.description': 'Ein Software-Ingenieur und Mitwirkender an Open-Source-Software in Chile 🇨🇱',
  'hero.doing':
    'Du kannst mich finden, wie ich mit Proof-of-Concepts spiele, blitzschnelle neue Technologien ausprobiere und die faszinierende Welt der Machine-Learning-Modelle erkunde.',
  'hero.currentEmployment': 'Ich arbeite derzeit bei',
  'hero.currentTeam': 'als {role}',
  'hero.lookingFor': 'Ich suche derzeit nach neuen beruflichen Möglichkeiten',
  'hero.noEmployment': 'Ich bin derzeit nicht angestellt',
  'hero.avatar.alt': 'KI-generierter Avatar mit',
  'hero.avatar.with': 'mit',

  'home.recentProjects': 'Aktuelle',
  'home.recentProjects.viewAll': 'Alle Projekte ansehen',
  'home.recentPosts': 'Aktuelle',
  'home.recentPosts.viewAll': 'Alle Beiträge ansehen',

  'blog.translatedBy': 'Inhalt übersetzt von',

  'posts.paginationDescription':
    'Ergebnis einiger Brain-Dumping-Prozesse, die ich von Zeit zu Zeit durchlaufe',
  'posts.by': 'Von',
  'posts.on': 'am',
  'posts.pagination.older': 'Ältere Beiträge',
  'posts.pagination.newer': 'Neuere Beiträge',

  'projects.paginationDescription':
    'Nicht unbedingt alles, was ich gemacht habe, aber was ich rechtlich teilen darf 😄',
  'projects.releasedOn': 'Veröffentlicht am',
  'projects.go': 'Los',
  'projects.pagination.older': 'Ältere Projekte',
  'projects.pagination.newer': 'Neuere Projekte',

  'tags.CSharp': 'C#',
  'tags.DotNet6': '.NET 6.0',
  'tags.Xcode': 'Xcode',
  'tags.Containers': 'Container',
  'tags.Architecture': 'Architektur',
  'tags.Pipelines': 'Pipelines',
  'tags.TailwindCSS': 'Tailwind.css',
  'tags.TypeScript': 'TypeScript',
  'tags.WebScraping': 'Web Scraping',
  'tags.Blog': 'Blog',
  'tags.JavaScript': 'JavaScript',
  'tags.AstroJS': 'Astro.js',
  'tags.ReverseEngineering': 'Reverse Engineering',
  'tags.Hardware': 'Hardware',
  'tags.Android': 'Android',
  'tags.Embedded': 'Eingebettet',
  'tags.undefined': 'UNDEFINIERTES TAG',

  '404.title': 'Seite nicht gefunden',
  '404.description': 'Die Seite, die Sie suchen, existiert nicht.',
  '404.heading': 'Etwas fehlt',
  '404.body':
    'Die Seite, die Sie suchen, existiert nicht. Vielleicht haben Sie die Adresse falsch eingegeben oder die Seite wurde verschoben.',
  '404.back': 'Zurück zur Startseite',

  'footer.rights': 'Alle Rechte vorbehalten',
  'footer.built': 'Erstellt mit',
};

// Default to Spanish translations if a key is missing
export const deWithFallback: { [Key in keyof typeof es]: string } = new Proxy(de, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
