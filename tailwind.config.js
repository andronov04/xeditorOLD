// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  darkMode: true,
  theme: {
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
      }
    }
  }
};
