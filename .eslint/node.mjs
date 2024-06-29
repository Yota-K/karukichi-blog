import globals from 'globals'

/** @type { import("eslint").Linter.FlatConfig[] } */
const config = [
  {
    files: ['eslint.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
]

export default config
