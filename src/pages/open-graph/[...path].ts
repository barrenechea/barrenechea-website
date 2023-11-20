import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const defaultOgImage = {
  data: {
    title: "Barrenechea",
    description:
      "Welcome to the official website of Sebastian Barrenechea. Discover my diverse range of personal projects and delve into thought-provoking blog posts.",
  },
};

const posts = await getCollection("posts");
const projects = await getCollection("projects");
const allPages = [...posts, ...projects]

const pages = Object.fromEntries(
  allPages.map(({ collection, id, slug, data }) => [`${collection}/${id}`, { data, slug }])
);

// @ts-expect-error just to add a default og image
pages["default-og-image"] = defaultOgImage;

export const { getStaticPaths, GET } = OGImageRoute({
  param: "path",
  pages,
  getImageOptions: (_, { data }: (typeof pages)[string]) => {
    return {
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
    };
  },
});
