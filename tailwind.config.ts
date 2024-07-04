import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      headerBlue: {
        background: '#39394d',
      },
      primary: '#7180ea',
      secondary: '#dbeafe',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
