import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import jsxA11YPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'

const compat = new FlatCompat()

/** @type { import("eslint").Linter.FlatConfig[] } */
const config = [
  ...fixupConfigRules(
    compat.extends(
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended'
    )
  ).map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        {
          name: 'Link',
          linkAttribute: 'to',
        },
        {
          name: 'NavLink',
          linkAttribute: 'to',
        },
      ],
      'import/resolver': {
        typescript: {},
      },
    },
    plugins: {
      react: fixupPluginRules(reactPlugin),
      'jsx-a11y': fixupPluginRules(jsxA11YPlugin),
    },
  },

  // storybookのESLintのルールは拡張子が.stories.tsxファイルのみに適用したいので別で定義
  ...fixupConfigRules(compat.extends('plugin:storybook/recommended')).map(
    (config) => ({
      ...config,
      files: ['**/*.stories.tsx'],
    })
  ),
]

export default config
