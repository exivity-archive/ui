import { BASE_SIZE, preciseEm } from '../utils/styled/isolated'
import { PALETTE } from './palette'

export const BASE_SPACING = preciseEm(1.25) // 20px
export const SIZES = {
  tiny: preciseEm(0.7), // 11px
  small: preciseEm(0.8), // 13px
  base: preciseEm(1), // 16px
  large: preciseEm(1.2), // 18px
  huge: preciseEm(1.5) // 24px
}

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
  space: [
    0,
    `${BASE_SPACING / 2}em`,
    `${BASE_SPACING}em`,
    `${BASE_SPACING * 2}em`
  ],
  fontSizes: [
    `${SIZES.tiny}em`,
    `${SIZES.small}em`,
    `${SIZES.base}em`,
    `${SIZES.large}em`,
    `${SIZES.huge}em`
  ],
  global: {
    baseSize: BASE_SIZE,
    baseSpacing: BASE_SPACING, // 20px
    fontFamily: `'Fira Sans', sans-serif`,
    fontFamilyMonospace: `'Fira Mono', monospace`,
    textColor: PALETTE.dark,
    textColorMuted: PALETTE.gray,
    lineHeight: 1.5,
    borderRadius: 4, // px
    borderWidth: 1, // px
    borderColor: PALETTE.lightGray,
    outlineWidth: 4, // px
    outlineAlpha: 0.15,
    shadowAlpha: 0.1,
    purposes: {
      _default: 'primary',
      primary: PALETTE.blue,
      secondary: PALETTE.gray,
      success: PALETTE.green,
      danger: PALETTE.red
    },
    sizes: {
      _default: 'base',
      ...SIZES
    },
    zPriority: {
      one: 1,
      two: 2,
      three: 3
    }
  },
  colors: {
    ...PALETTE
  }
}
