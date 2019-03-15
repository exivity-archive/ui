import { preciseEm } from '../utils/styled/isolated'
import { palette } from './palette'

export const BASE_SIZE = 16

export const lightTheme = {
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
      _default: 'primary',
      primary: palette.blue,
      secondary: palette.gray,
      success: palette.green,
      danger: palette.red
    },
    sizes: {
      _default: 'base',
      tiny: preciseEm(0.7), // 11px
      small: preciseEm(0.8), // 13px
      base: preciseEm(1), // 16px
      large: preciseEm(1.2), // 18px
      huge: preciseEm(1.5) // 24px
    }
  },
  colours: {
    ...palette
  }
}
