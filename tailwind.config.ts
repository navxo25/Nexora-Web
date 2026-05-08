import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#060608',
        surface: '#16161f',
        gold: '#c9a84c',
        teal: '#4cc9c0',
        purple: '#9b5fe0',
        dim: '#5a5a72',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config;