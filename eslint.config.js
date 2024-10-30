// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

const typescriptEslint = tseslint.plugin;
const tsParser = tseslint.parser;

export default tseslint.config(
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      'dist/**/*',
      '**/node_modules',
      '**/target',
      '**/.vercel',
      '**/.astro',
      '**/.github',
      '*.cjs',
      'src/env.d.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'unused-imports': unusedImports,
      tailwindcss: tailwindcss,
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Astro
  ...eslintPluginAstro.configs.recommended,

  // Tailwind
  ...tailwindcss.configs['flat/recommended'],

  // Remove some safety rules around any for various reasons
  {
    files: [
      '**/*.astro', // Disabled because eslint-plugin-astro doesn't type Astro.props correctly in some contexts, so a bunch of things ends up being any
      'api/add/script.js', // Script is in JSDoc and interact with an API, some things are any because I can't be bothered
      'scripts/**/*.ts', // Interact with untyped APIs a bunch, can't be bothered
    ],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },

  // Disable typed rules for scripts inside Astro files
  // https://github.com/ota-meshi/eslint-plugin-astro/issues/240
  {
    files: ['**/*.astro/*.ts'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    ...tseslint.configs.disableTypeChecked,
  }
);
