import { es, type OptionalTranslations } from './es.ts';

export const is: OptionalTranslations = {
  'nav.fork': 'Forkaðu mig á GitHub',
  'nav.sr.open': 'Opna leiðsagnarvalmynd',
  'nav.home': 'Heim',
  'nav.projects': 'Verkefni',
  'nav.posts': 'Færslur',
  'nav.page': 'Síða',
  'nav.language.select': 'Veldu tungumál',

  'hero.greeting': 'Halló! Ég heiti',
  'hero.description':
    'Ég er hugbúnaðarverkfræðingur og þátttakandi í opnum hugbúnaði staðsettur í Chile 🇨🇱',
  'hero.doing':
    'Þú getur fundið mig að leika mér með hugtakaprófanir, nýjar tækni og könnun á heillandi heimi vélrænnar námslíkana.',
  'hero.currentEmployment': 'Ég starfa núna hjá',
  'hero.currentTeam': 'sem {role}',
  'hero.lookingFor': 'Ég er núna að leita að nýjum starfstækifærum',
  'hero.noEmployment': 'Ég er ekki í starfi núna',
  'hero.avatar.alt': 'Gervigreindarbúinn avatar notaður',
  'hero.avatar.with': 'með',

  'home.recentProjects': 'Nýleg',
  'home.recentProjects.viewAll': 'Skoða öll verkefni',
  'home.recentPosts': 'Nýlegar',
  'home.recentPosts.viewAll': 'Skoða allar færslur',

  'blog.translatedBy': 'Efni þýtt af',

  'posts.paginationDescription': 'Niðurstöður úr nokkrum hugdumps sem ég fer í gegnum af og til',
  'posts.by': 'Eftir',
  'posts.on': 'þann',
  'posts.pagination.older': 'Eldri færslur',
  'posts.pagination.newer': 'Nýrri færslur',

  'projects.paginationDescription':
    'Ekki endilega allt sem ég hef gert, en það sem ég get lagalega deilt 😄',
  'projects.releasedOn': 'Útgefið þann',
  'projects.go': 'Fara',
  'projects.pagination.older': 'Eldri verkefni',
  'projects.pagination.newer': 'Nýrri verkefni',

  'tags.Containers': 'Gámar',
  'tags.Architecture': 'Arkitektúr',
  'tags.Pipelines': 'Pípulínur',
  'tags.WebScraping': 'Vefsópun',
  'tags.Blog': 'Blogg',
  'tags.ReverseEngineering': 'Afturverkfræði',
  'tags.Hardware': 'Vélbúnaður',
  'tags.Embedded': 'Innbyggður',
  'tags.undefined': 'ÓSKILGREIND TAG',

  '404.title': 'Síða fannst ekki',
  '404.description': 'Síðan sem þú ert að leita að er ekki til.',
  '404.heading': 'Eitthvað vantar',
  '404.body':
    'Síðan sem þú ert að leita að er ekki til. Þú gætir hafa skrifað netfangið vitlaust eða síðan hefur verið færð.',
  '404.back': 'Til baka á heimasíðu',

  'footer.rights': 'Öll réttindi áskilin',
  'footer.built': 'Búið til með',
};

// Default to Spanish translations if a key is missing
export const isWithFallback: { [Key in keyof typeof es]: string } = new Proxy(is, {
  get: (target, name: keyof typeof es) => target[name] ?? es[name],
}) as { [Key in keyof typeof es]: string };
