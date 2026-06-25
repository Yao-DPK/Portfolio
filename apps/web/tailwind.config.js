/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← On utilisera la classe "dark" sur l'élément <html>
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Notre charte graphique
        royal: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6', // bleu roi medium
          600: '#2563EB', // bleu roi principal (CTA)
          700: '#1D4ED8', // bleu roi foncé (hover)
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Couleurs neutres (on garde les noms Tailwind par défaut)
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}