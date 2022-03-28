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
      padding: {
        '5px': '5px'
      },
      width: {
        250: '250px'
      },
      height: {
        7: '1.7rem'
      },
      fontSize: {
        small: [
          '0.55rem',
          {
            lineHeight: '1rem'
          }
        ],
        xsss: [
          '0.58rem',
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
        darkE7: '#e7e7e7',
        dark4A: '#4A4C50',
        dark99: '#999FA5'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
