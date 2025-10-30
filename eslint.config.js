// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginAstro from 'eslint-plugin-astro';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // Global ignores
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.vercel',
      '**/.astro',
      '**/.github',
      '*.cjs',
      'src/env.d.ts',
    ],
  },

  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // TypeScript and general rules
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
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

  // Prettier config (turns off conflicting rules)
  eslintConfigPrettier,

  // Astro files
  ...eslintPluginAstro.configs.recommended,

  // Relax type-safety rules for specific files
  {
    files: ['**/*.astro', 'api/add/script.js', 'scripts/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },

  // Disable type-checking for script tags in Astro files
  // https://github.com/ota-meshi/eslint-plugin-astro/issues/240
  {
    files: ['**/*.astro/*.ts'],
    ...tseslint.configs.disableTypeChecked,
  },

  // Disable type-checking for config files
  {
    files: ['*.config.js', '*.config.mjs', '*.config.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },
]);
