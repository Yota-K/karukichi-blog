import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

/** @type { import("eslint").Linter.FlatConfig[] } */
const config = [
  ...fixupConfigRules(
    compat.extends('plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:import/typescript'),
  ).map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
];

export default config;
