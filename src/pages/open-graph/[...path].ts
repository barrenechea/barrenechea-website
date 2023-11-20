import { OGImageRoute } from "astro-og-canvas";

const defaultOgImage = {
  frontmatter: {
    title: "Barrenechea",
    description:
      "Welcome to the official website of Sebastian Barrenechea. Discover my diverse range of personal projects and delve into thought-provoking blog posts.",
  },
};

const allPages = await import.meta.glob("/src/content/**/*.mdx", { eager: true });

/** An object mapping file paths to file metadata. */
const pages = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.values(allPages).map(({ url, frontmatter }: any) => [url.split("content/")[1], { frontmatter }])
);

pages["default-og-image"] = defaultOgImage;

export const { getStaticPaths, GET } = OGImageRoute({
  param: "path",
  pages,
  getImageOptions: (_, { frontmatter }: (typeof pages)[string]) => ({
    title: frontmatter.title,
    description: frontmatter.description,
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
