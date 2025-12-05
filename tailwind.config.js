/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
        bilal: ['"UniQAIDAR_BiLaL003"', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#e11d48', // Rose 600
          dark: '#be123c', // Rose 700
          light: '#fb7185', // Rose 400
        },
        libristo: {
          primary: '#0f172a', // Slate 900
          secondary: '#ffffff', // White
          accent: '#e11d48', // Rose 600
          yellow: '#f59e0b', // Amber 500
        },
        text: {
          main: '#334155', // Slate 700
          light: '#64748b', // Slate 500
        },
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