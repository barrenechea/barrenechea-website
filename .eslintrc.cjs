module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      plugins: ["jsx-a11y", "unused-imports", "tailwindcss", "simple-import-sort"],
      extends: ["plugin:jsx-a11y/recommended", "plugin:tailwindcss/recommended", "plugin:@typescript-eslint/recommended"],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["unused-imports", "tailwindcss", "simple-import-sort"],
      extends: ["plugin:tailwindcss/recommended", "plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ["**/*.astro/*.js", "*.astro/*.js"],
      plugins: [
        "jsx-a11y",
        'unused-imports',
        'tailwindcss',
        'simple-import-sort',
      ],
      extends: ["plugin:jsx-a11y/recommended", "plugin:tailwindcss/recommended", "plugin:@typescript-eslint/recommended"],
      parser: "@typescript-eslint/parser",
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-undef': 'off',
      },
    },
  ],
};
