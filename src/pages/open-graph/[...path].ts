import { OGImageRoute } from "astro-og-canvas";

const defaultOgImage = {
  frontmatter: {
    title: "Barrenechea",
    description:
      "Welcome to the official website of Sebastian Barrenechea. Discover my diverse range of personal projects and delve into thought-provoking blog posts.",
  },
};

const pages = await import.meta.glob("/src/content/**/*.mdx", { eager: true });
pages["/default-og-image"] = defaultOgImage;

export const { getStaticPaths, GET } = OGImageRoute({
  param: "path",
  pages,
  getImageOptions: (path, page) => ({
    title: page.frontmatter.title,
    description: page.frontmatter.description,
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
      "https://github.com/withastro/docs/raw/temp-fonts-cdn/src/pages/open-graph/_fonts/work-sans/latin-400-normal.ttf",
      "https://github.com/withastro/docs/raw/temp-fonts-cdn/src/pages/open-graph/_fonts/work-sans/latin-800-normal.ttf",
    ],
  }),
});
