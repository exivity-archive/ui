import { preciseEm } from '../utils/styled/isolated'
import { DeepReadonly } from '../utils/types'

export const BASE_SIZE = 16

const palette = {
  black: '#000',
  dark: '#222',
  gray: '#999',
  lightGray: '#eee',
  white: '#fff',
  blue: '#00a8d8',
  red: '#ef5350',
  yellow: '#fff68c',
  green: '#4caf50'
}

const theme = {
  fonts: {
    custom: {
      families: [],
      urls: [
        // Optional
        // 'font/stylesheet.css'
      ]
    },
    google: {
      families: [
        'Fira Mono:400',
        'Fira Sans:400,600'
      ]
    }
  },
  global: {
    baseSize: BASE_SIZE,
    fontFamily: `'Fira Sans', sans-serif`,
    fontFamilyMonospace: `'Fira Mono', monospace`,
    textColor: palette.dark,
    textColorMuted: palette.gray,
    lineHeight: 1.5,
    borderRadius: 4, // px
    borderWidth: 1, // px
    outlineWidth: 4, // px
    outlineAlpha: 0.15,
    shadowAlpha: 0.1,
    spacing: preciseEm(1.25), // 20px
    purposes: {
      primary: palette.blue,
      secondary: palette.gray,
      success: palette.green,
      danger: palette.red
    },
    sizes: {
      small: preciseEm(0.85), // 14px
      large: preciseEm(1.2) // 18px
    }
  },
  colours: {
    ...palette
  }
}

export type Theme = DeepReadonly<typeof theme>

export default theme
