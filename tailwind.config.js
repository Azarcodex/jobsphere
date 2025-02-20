module.exports = {
  purge:  ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
        poppins:['Poppins','sans-serif'],
        logo: [ 'Almendra SC', 'serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
