import js from '@eslint/js';
import globals from 'globals';

import baseEslintConfig from './.eslint/base.mjs';
import nodeEslintConfig from './.eslint/node.mjs';
import reactEslintConfig from './.eslint/react.mjs';
import tsEslintConfig from './.eslint/typescript.mjs';

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    ignores: ['!**/.server', '!**/.client', '**/node_modules/', '**/*.md', '!.storybook', 'build', "functions"],
  },

  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  ...baseEslintConfig,
  ...tsEslintConfig,
  ...reactEslintConfig,
  ...nodeEslintConfig,
];
