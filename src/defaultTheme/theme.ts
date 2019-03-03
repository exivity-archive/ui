import { preciseEm } from '../utils/theme/isolated'
import { DeepReadonly } from '../utils/types'

export const BASE_SIZE = 16

export const PURPOSE_PRIMARY = 'primary'
export const PURPOSE_SECONDARY = 'secondary'
export const PURPOSE_SUCCESS = 'success'
export const PURPOSE_DANGER = 'danger'

const palette = {
  black: '#000',
  dark: '#222',
  gray: '#777',
  lightGray: '#eee',
  white: '#fff',
  blue: '#00a8d8',
  red: '#c33c32',
  yellow: '#fff68c',
  green: '#238e47'
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
        'Fira Sans Condensed:300,500',
        'Fira Sans:400,600'
      ]
    }
  },
  global: {
    baseSize: BASE_SIZE,
    fontFamily: `'Fira Sans', sans-serif`,
    textColor: palette.dark,
    textColorMuted: palette.gray,
    lineHeight: 1.5,
    borderRadius: '4px',
    borderWidth: '1px',
    outlineWidth: '4px',
    spacing: '1em',
    purposes: {
      [PURPOSE_PRIMARY]: palette.blue,
      [PURPOSE_SECONDARY]: palette.black,
      [PURPOSE_SUCCESS]: palette.green,
      [PURPOSE_DANGER]: palette.red
    },
    sizes: {
      small: preciseEm(0.85),
      large: preciseEm(1.2)
    }
  },
  colours: {
    ...palette
  }
}

export type Theme = DeepReadonly<typeof theme>

export default theme
