import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    green: {
      50: '#e9fee2',
      100: '#c9f6b9',
      200: '#a2f088', //tccgreen
      300: '#84eb61',
      400: '#63e537',
      500: '#49cc1f',
      600: '#399f16',
      700: '#27710e',
      800: '#154406',
      900: '#031800',
    },
    black: {
      200: '#0f2426'
    },
    blue:{
      200: '#5271ff'
    }
  },
})

export default theme;


