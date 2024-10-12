import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        md: '2rem',
      },
      screens: {
        '2xl': '768px',
      },
    },
    extend: {
      colors: {
        blue: {
          headerBlue: '#39394d',
          primary: '#331cbf',
          secondary: '#7180ea',
          tertiary: '#dbeafe',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
