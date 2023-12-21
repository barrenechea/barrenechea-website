import { OGImageRoute } from "astro-og-canvas";

import { allPages } from "~/content";

const title = "Barrenechea";

const descriptions = {
  "en": "Welcome to the official website of Sebastian Barrenechea. Discover my diverse range of personal projects and delve into thought-provoking blog posts.",
  "es": "Bienvenidos al sitio web oficial de Sebastián Barrenechea. Descubran mi variada gama de proyectos personales y sumérjanse en publicaciones que invitan a la reflexión.",
  "de": "Willkommen auf der offiziellen Website von Sebastian Barrenechea. Entdecken Sie meine vielfältige Palette an persönlichen Projekten und tauchen Sie ein in nachdenkliche Blog-Beiträge.",
} as { [lang: string]: string };

/** An object mapping file paths to file metadata. */
const pages = Object.fromEntries(
  allPages.map(({ collection, slug, data }) => {
    const [lang, ...slugParts] = slug.split("/");
    return [`${lang}/${collection}/${slugParts.join("/")}`, { data }];
  })
);

const uniqueLanguages = Object.keys(pages).map((path) => path.split("/")[0]);

if (uniqueLanguages.some((lang) => !(lang in descriptions))) {
  throw new Error("src/pages/open-graph/[...path].ts: Missing OpenGraph default description for some language");
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
  param: "path",
  pages,
  getImageOptions: (_, { data }: (typeof pages)[string]) => ({
    title: data.title,
    description: data.description,
    logo: {
      path: "./src/assets/og-image.png",
      size: [200],
    },
    border: { color: [251, 191, 36], width: 20, side: "inline-start" },
    bgGradient: [
      [24, 24, 27],
      [39, 39, 42],
    ],
    font: {
      title: {
        size: 50,
        families: ["Work Sans"],
        weight: "SemiBold",
      },
      description: {
        size: 38,
        families: ["Work Sans"],
        weight: "Normal",
      },
    },
    fonts: [
      "./src/pages/open-graph/_fonts/work-sans/latin-400-normal.ttf",
      "./src/pages/open-graph/_fonts/work-sans/latin-800-normal.ttf",
    ],
  }),
});
