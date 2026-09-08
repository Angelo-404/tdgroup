import type { Config } from 'tailwindcss';

const opacita = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, String(i / 100)]),
);

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        bone: '#f8f9fa',
        cantiere: '#E6B91E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-grotesk)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      opacity: opacita,
      borderOpacity: opacita,
      backgroundOpacity: opacita,
      textOpacity: opacita,
      maxWidth: {
        prosa: '68ch',
      },
      transitionTimingFunction: {
        morbida: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
