module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik']
      },
      backgroundColor:{
        'dark-1': '#0d0d0d',
        'dark-2': '#121212',
        'dark-3': '#1c1c1c',
        'dark-4': '#2b2b2b',
        'dark-5': '#363636',
        'dark-6': '#3F3E3EFF',
        'dark-7': '#494949',
      },
      borderColor: {
        'dark-1': '#333',
        'dark-2': '#3d3d3d',
        'dark-3': '#4d4d4d',
      },
      backgroundImage: {
        'login': "url('/assets/controller.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
