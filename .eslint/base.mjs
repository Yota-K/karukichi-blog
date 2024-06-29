import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import importPlugin from 'eslint-plugin-import'

const compat = new FlatCompat()

/** @type { import("eslint").Linter.FlatConfig[] } */
const config = [
  ...fixupConfigRules(compat.extends('plugin:import/recommended')).map(
    (config) => ({
      ...config,
      files: ['**/*.{js,ts,tsx}'],
    })
  ),

  {
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    settings: {
      'import/internal-regex': '^~/',
      // ESLint flat configでeslint-plugin-importを使用するための設定。
      // settings.import/parsersを使用して、getParserPath 関数から不足しているパーサーを追加する。
      //
      // ref: https://github.com/import-js/eslint-plugin-import/issues/2556#issuecomment-1419518561
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
      'sort-imports': [
        'error',
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  },
]

export default config
