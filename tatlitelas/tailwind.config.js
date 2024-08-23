module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#6B705C',
        secondary: '#A5A58D',
        'custom-green': '#7dad7d',
        'custom-brown': '#CB997E',
      },
      fontFamily: {
        'dancing': ['Dancing Script', 'cursive'],
        'great-vibes': ['Great Vibes', 'cursive'],
        'sans': ['Roboto', 'Arial', 'sans-serif'],
      },
      margin: {
        '7.5': '1.875rem', // 30px
      },
    },
  },
  plugins: [],
};