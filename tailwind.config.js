/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js,css}",
            "!./public/source/css/ownInputs.css"],
  theme: {
    fontFamily: {
      'Montserrat' : 'Montserrat',
    },
    fontSize: {
      'title' : '10vh',
      'subtitle' : '6vh',
      'info' : '4vh',
      'subinfo' : '2vh',
      'cardTitle' : '4vh',
      '3vh' : '3vh',
      '5vh' : '5vh',
    },
    extend: {
      colors: {
        'primario': '#29235C',
        'secundario': '#2D2E83',
        'terciario': '#1D71B8',
        'cuartario': '#008FD6',
      },
      spacing: {
        'hS': '70vh',
      }
    },
  },
  plugins: [],
}

