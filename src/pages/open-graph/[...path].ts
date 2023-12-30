import { OGImageRoute } from 'astro-og-canvas';

import { allPages } from '~/content';

const title = 'Barrenechea';

const descriptions = {
  es: 'Bienvenidos al sitio web oficial de Sebastián Barrenechea. Descubran mi variada gama de proyectos personales y sumérjanse en posteos que invitan a la reflexión.',
  en: 'Welcome to the official website of Sebastian Barrenechea. Discover my diverse range of personal projects and delve into thought-provoking blog posts.',
  de: 'Willkommen auf der offiziellen Website von Sebastian Barrenechea. Entdecken Sie meine vielfältige Palette an persönlichen Projekten und tauchen Sie ein in nachdenkliche Blog-Beiträge.',
  zh: '欢迎来到Sebastian Barrenechea的官方网站。发现我各种各样的个人项目，并深入思考引人深思的博客文章。',
  fr: 'Bienvenue sur le site officiel de Sebastián Barrenechea. Découvrez ma gamme diversifiée de projets personnels et plongez dans des articles de blog qui invitent à la réflexion.',
  it: 'Benvenuti sul sito ufficiale di Sebastián Barrenechea. Scopri la mia vasta gamma di progetti personali e immergiti in post di blog che invitano alla riflessione.',
  is: 'Velkomin á opinbera vefsíðu Sebastián Barrenechea. Upptäkið fjölbreytta úrval persónulegra verkefna minna og dýfið í hugleiðingarvottorðandi blogg færslur.',
} as { [lang: string]: string };

/** An object mapping file paths to file metadata. */
const pages = Object.fromEntries(
  allPages.map(({ collection, slug, data }) => {
    const [lang, ...slugParts] = slug.split('/');
    return [`${lang}/${collection}/${slugParts.join('/')}`, { data }];
  })
);

const uniqueLanguages = Object.keys(pages).map((path) => path.split('/')[0]);

if (uniqueLanguages.some((lang) => !(lang in descriptions))) {
  throw new Error(
    'src/pages/open-graph/[...path].ts: Missing OpenGraph default description for some language'
  );
}

uniqueLanguages.forEach((lang) => {
  pages[`${lang}/default-og-image`] = {
    // @ts-expect-error - Add default og image to pages object
    data: {
      title,
      description: descriptions[lang],
    },
  };
});

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'path',
  pages,
  getImageOptions: (_, { data }: (typeof pages)[string]) => ({
    title: data.title,
    description: data.description,
    logo: {
      path: './src/assets/og-image.png',
      size: [200],
    },
    border: { color: [251, 191, 36], width: 20, side: 'inline-start' },
    bgGradient: [
      [24, 24, 27],
      [39, 39, 42],
    ],
    font: {
      title: {
        size: 50,
        families: ['Work Sans'],
        weight: 'SemiBold',
      },
      description: {
        size: 38,
        families: ['Work Sans'],
        weight: 'Normal',
      },
    },
    fonts: [
      './src/pages/open-graph/_fonts/work-sans/latin-400-normal.ttf',
      './src/pages/open-graph/_fonts/work-sans/latin-800-normal.ttf',
    ],
  }),
});
