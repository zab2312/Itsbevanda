/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'geist': ['Geist', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'instrument-serif': ['Instrument Serif', 'serif'],
        'merriweather': ['Merriweather', 'serif'],
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
        'pt-serif': ['PT Serif', 'serif'],
        'geist-mono': ['Geist Mono', 'monospace'],
        'space-mono': ['Space Mono', 'monospace'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

