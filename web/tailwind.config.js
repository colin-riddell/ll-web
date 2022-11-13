const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  typography: (theme) => ({
    DEFAULT: {
      css: {
        color: theme('colors.gray.700'),
        a: {
          color: theme('colors.blue.500'),
          '&:hover': {
            color: theme('colors.blue.700')
          },
          code: { color: theme('colors.blue.400') }
        },
        'h2,h3,h4': {
          'scroll-margin-top': spacing[32]
        },
        thead: {
          borderBottomColor: theme('colors.gray.200')
        },
        code: { color: theme('colors.pink.500') },
        'blockquote p:first-of-type::before': false,
        'blockquote p:last-of-type::after': false
      }
    },
    dark: {
      css: {
        color: theme('colors.gray.200'),
        a: {
          color: theme('colors.blue.400'),
          '&:hover': {
            color: theme('colors.blue.600')
          },
          code: { color: theme('colors.blue.400') }
        },
        blockquote: {
          borderLeftColor: theme('colors.gray.700'),
          color: theme('colors.gray.300')
        },
        'h2,h3,h4': {
          color: theme('colors.gray.100'),
          'scroll-margin-top': spacing[32]
        },
        hr: { borderColor: theme('colors.gray.700') },
        ol: {
          li: {
            '&:before': { color: theme('colors.gray.500') }
          }
        },
        ul: {
          li: {
            '&:before': { backgroundColor: theme('colors.gray.500') }
          }
        },
        strong: { color: theme('colors.gray.100') },
        thead: {
          th: {
            color: theme('colors.gray.100')
          },
          borderBottomColor: theme('colors.gray.600')
        },
        tbody: {
          tr: {
            borderBottomColor: theme('colors.gray.700')
          }
        }
      }
    }
  }),
  theme: {
    // fontFamily: {
    //   'label': ['']
    // },
    extend: {
      
      colors: {
        tccblack: '#0f2426',
        tccgreen: '#A2F088',
        primary: '#202225',
        secondary: '#5865f2',
        gray: colors.neutral,
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f455c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5'
         
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}