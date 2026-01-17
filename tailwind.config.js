/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#050505',
        'brand-accent': '#3b82f6',
        'brand-purple': '#8b5cf6',
        'brand-green': '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      lineHeight: {
        'extra-loose': '2.5',
      }
    },
  },
  plugins: [],
}