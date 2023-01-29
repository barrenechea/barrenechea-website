const aspectRatio = require('@tailwindcss/aspect-ratio');
const typography = require('@tailwindcss/typography');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', ...defaultTheme.fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '' },
            'code::after': { content: '' },
          },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    aspectRatio,
    typography
  ],
};
