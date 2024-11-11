import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        primary: 'rgb(var(--primary) / <alpha-value>)',
        'secondary-light-blue': 'rgb(var(--secondary-light-blue) / <alpha-value>)',
        'secondary-middle-blue': 'rgb(var(--secondary-middle-blue) / <alpha-value>)',

        orange: 'rgb(var(--orange) / <alpha-value>)',
        green: 'rgb(var(--green) / <alpha-value>)',
        blue: 'rgb(var(--blue) / <alpha-value>)',
        yellow: 'rgb(var(--yellow) / <alpha-value>)',
        purple: 'rgb(var(--purple) / <alpha-value>)',
      },
      textColor: {
        black: 'rgb(var(--text-primary) / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        light: 'rgb(var(--text-light) / <alpha-value>)',
      },
      borderColor: {
        first: 'rgb(var(--border-first) / <alpha-value>)',
        secondary: 'rgba(215, 221, 228, 0.5)',
        third: 'rgba(var(--border-third) / <alpha-value>)',
      },
      backgroundColor: {
        'light-gray': 'rgb(var(--bg-light-gray) / <alpha-value>)',
        'light-blue': 'rgb(var(--bg-light-blue) / <alpha-value>)',
        'middle-gray': 'rgb(var(--bg-middle-gray) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-link':
          'linear-gradient(to bottom, rgba(230, 234, 237, 0.3), rgba(241, 241, 241, 0.3))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontWeight: {
        normal: '350',
      },
      animation: {
        'bounce-right': 'bounce-right 600ms ease-out 2',
      },
      keyframes: {
        'bounce-right': {
          '0% 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
