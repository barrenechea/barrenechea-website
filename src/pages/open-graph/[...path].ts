import { OGImageRoute } from 'astro-og-canvas';

import { allPages } from '~/content';
import { type LanguageKey, useTranslations } from '~/i18n/translations';

type OGImageOptions = Awaited<ReturnType<Parameters<typeof OGImageRoute>[0]['getImageOptions']>>;

const title = 'Barrenechea';

const descriptions = {
  es: 'Bienvenidos al sitio web oficial de Sebastián Barrenechea. Descubran mi variada gama de proyectos personales y sumérjanse en posteos que invitan a la reflexión.',
  en: 'Welcome to the official website of Sebastian Barrenechea. Discover my diverse range of personal projects and delve into thought-provoking blog posts.',
  pt: 'Bem-vindo ao site oficial de Sebastián Barrenechea. Descubra minha ampla gama de projetos pessoais e mergulhe em postagens de blog que convidam à reflexão.',
  de: 'Willkommen auf der offiziellen Website von Sebastian Barrenechea. Entdecken Sie meine vielfältige Palette an persönlichen Projekten und tauchen Sie ein in nachdenkliche Blog-Beiträge.',
  ru: 'Добро пожаловать на официальный сайт Себастьян Барренечеа. Ознакомьтесь с моим разнообразным спектром личных проектов и погрузитесь в размышления, которые призывают к размышлению.',
  zh: '欢迎来到Sebastian Barrenechea的官方网站。发现我各种各样的个人项目，并深入思考引人深思的博客文章。',
  ja: 'Sebastian Barrenecheaの公式ウェブサイトへようこそ。多様な個人プロジェクトを発見し、考えさせられるブログ投稿に没頭してください。',
  ar: 'مرحبًا بكم في الموقع الرسمي لسيباستيان بارينيشيا. استكشفوا مجموعتي المتنوعة من المشاريع الشخصية واستمتعوا بقراءة التدوينات التي تحفز التفكير.',
  fr: 'Bienvenue sur le site officiel de Sebastián Barrenechea. Découvrez ma gamme diversifiée de projets personnels et plongez dans des articles de blog qui invitent à la réflexion.',
  it: 'Benvenuti sul sito ufficiale di Sebastián Barrenechea. Scopri la mia vasta gamma di progetti personali e immergiti in post di blog che invitano alla riflessione.',
  is: 'Velkomin á opinbera vefsíðu Sebastián Barrenechea. Upptäkið fjölbreytta úrval persónulegra verkefna minna og dýfið í hugleiðingarvottorðandi blogg færslur.',
} as Record<string, string>;

/** An object mapping file paths to file metadata. */
const pages = Object.fromEntries(
  allPages.map(({ collection, slug, data }) => {
    const [lang, ...slugParts] = slug.split('/');
    return [`${lang}/${collection}/${slugParts.join('/')}`, { data, lang }];
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
    lang,
  };
});

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'path',
  pages,
  getImageOptions: (_, { data, lang }: (typeof pages)[string]): OGImageOptions => {
    const dir = useTranslations(lang as LanguageKey)('language.direction') as 'ltr' | 'rtl';

    return {
      title: data.title,
      description: data.description,
      dir,
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
          families: [
            'Work Sans',
            'Noto Sans',
            'Noto Sans Arabic',
            'Noto Sans SC',
            'Noto Sans TC',
            'Noto Sans JP',
            'Noto Sans KR',
          ],
          weight: 'SemiBold',
        },
        description: {
          size: 38,
          families: [
            'Work Sans',
            'Noto Sans',
            'Noto Sans Arabic',
            'Noto Sans SC',
            'Noto Sans TC',
            'Noto Sans JP',
            'Noto Sans KR',
          ],
          weight: 'Normal',
        },
      },
      fonts: [
        './src/pages/open-graph/_fonts/work-sans/latin-400-normal.ttf',
        './src/pages/open-graph/_fonts/work-sans/latin-800-normal.ttf',

        './src/pages/open-graph/_fonts/noto-sans/noto-400-normal.ttf',
        './src/pages/open-graph/_fonts/noto-sans/noto-500-normal.ttf',

        './src/pages/open-graph/_fonts/noto-sans/chinese-simplified-400-normal.otf',
        './src/pages/open-graph/_fonts/noto-sans/chinese-simplified-500-normal.ttf',

        './src/pages/open-graph/_fonts/noto-sans/chinese-traditional-400-normal.otf',
        './src/pages/open-graph/_fonts/noto-sans/chinese-traditional-500-normal.ttf',

        './src/pages/open-graph/_fonts/noto-sans/japanese-400-normal.ttf',
        './src/pages/open-graph/_fonts/noto-sans/japanese-500-normal.ttf',

        './src/pages/open-graph/_fonts/noto-sans/arabic-400-normal.ttf',
        './src/pages/open-graph/_fonts/noto-sans/arabic-500-normal.ttf',

        './src/pages/open-graph/_fonts/noto-sans/korean-400-normal.otf',
        './src/pages/open-graph/_fonts/noto-sans/korean-500-normal.ttf',
      ],
    };
  },
});
