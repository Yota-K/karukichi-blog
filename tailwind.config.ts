import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          headerBlue: '#39394d',
          primary: '#7180ea',
          secondary: '#dbeafe',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
