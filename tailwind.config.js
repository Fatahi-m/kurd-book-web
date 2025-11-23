/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        vazir: ['var(--font-vazirmatn)', 'Tahoma', 'Arial', 'sans-serif'],
        kurdish: ['var(--font-vazirmatn)', 'Tahoma', 'Arial', 'sans-serif'],
        english: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'var(--font-vazirmatn)', 'serif'],
        mono: ['var(--font-lora)', 'var(--font-vazirmatn)', 'monospace'],
        editorial: ['var(--font-playfair)', 'var(--font-vazirmatn)', 'serif'],
        body: ['var(--font-lora)', 'var(--font-vazirmatn)', 'serif'],
        sans: ['var(--font-inter)', 'var(--font-vazirmatn)', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}