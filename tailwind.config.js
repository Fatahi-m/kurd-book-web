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
        vazir: ['var(--font-noto-sans-arabic)', 'Tahoma', 'Arial', 'sans-serif'],
        kurdish: ['var(--font-noto-sans-arabic)', 'Tahoma', 'Arial', 'sans-serif'],
        english: ['Inter', 'Roboto', 'sans-serif'],
        german: ['Inter', 'Roboto', 'sans-serif'],
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