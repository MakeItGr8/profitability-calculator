/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        // Dark Mode Palette
        obsidian: '#0B0C15',     // Deepest background
        surface: '#151621',  // Card background
        glass: 'rgba(255, 255, 255, 0.03)', // Glass effect
        neon: {
          blue: '#00F0FF',
          purple: '#7000FF',
          green: '#00FF94',
          pink: '#FF0055'
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 240, 255, 0.15)',
        'glow-purple': '0 0 20px rgba(112, 0, 255, 0.15)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // Assuming we might want a display font, but sticking to Inter for now is fine or we can add Google Font link later
      }
    },
  },
  plugins: [],
}
