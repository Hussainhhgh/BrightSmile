/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f2',
          100: '#ffeceb',
          200: '#ffcec3',
          300: '#ffa78a',
          400: '#ff8a61',
          500: '#ff7a59',
          600: '#ff6b49',
          700: '#e45539'
        },
        accent: {
          50: '#f0f9ff',
          100: '#e6f7fb',
          500: '#06b6d4'
        },
        warm: {
          50: '#fff8f5',
          100: '#ffefe8'
        },
        surface: '#ffffff'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      borderRadius: {
        xl: '1rem',
        '3xl': '1.5rem'
      },
      boxShadow: {
        soft: '0 6px 20px rgba(2,6,23,0.06)',
        elev: '0 18px 40px rgba(14,165,233,0.08)'
      }
    }
  },
  plugins: []
};
