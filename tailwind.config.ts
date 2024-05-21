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
        'border-secondary': 'rgba(215, 221, 228, 0.5)',
        orange: 'rgb(var(--orange) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-link':
          'linear-gradient(to bottom, rgba(230, 234, 237, 0.3), rgba(241, 241, 241, 0.3))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
