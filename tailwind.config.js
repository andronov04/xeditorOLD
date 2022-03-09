// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    // fontFamily: {
    //   sans: ['Mohave', 'sans-serif'],
    //   display: ['Mohave'],
    //   body: ['Mohave']
    // },
    extend: {
      width: {
        250: '250px'
      },
      fontSize: {
        small: [
          '0.55rem',
          {
            lineHeight: '1rem'
          }
        ],
        xss: [
          '0.65rem',
          {
            lineHeight: '1rem'
          }
        ],
        smm: [
          '0.82rem',
          {
            lineHeight: '1rem'
          }
        ]
      },
      colors: {
        dart2C: '#2c2c2c',
        dark21: '#212121',
        dark41: '#414141',
        dark52: '#525252',
        darkE7: '#e7e7e7'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
