import { preciseEm } from '../utils/theme/isolated'
import { DeepReadonly } from '../utils/types'

export const BASE_SIZE = 16

export enum PURPOSES {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  DANGER = 'danger'
}

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
    borderRadius: '4px',
    borderWidth: '1px',
    outlineWidth: '4px',
    spacing: preciseEm(1.25), // 20px
    purposes: {
      [PURPOSES.PRIMARY]: palette.blue,
      [PURPOSES.SECONDARY]: palette.gray,
      [PURPOSES.SUCCESS]: palette.green,
      [PURPOSES.DANGER]: palette.red
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
