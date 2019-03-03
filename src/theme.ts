import './assets/styles/fonts.css'
import { DeepReadonly } from './utils/types'

export const BASE_SIZE = 16

const PURPOSE_PRIMARY = 'primary'
const PURPOSE_SECONDARY = 'secondary'
const PURPOSE_SUCCESS = 'success'
const PURPOSE_DANGER = 'danger'

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
      families: [
        'Fira Mono',
        'Pt Sans'
      ],
      urls: [
        './assets/styles/fonts.css'
      ]
    }
  },
  global: {
    fontFamily: 'Pt Sans',
    textColor: palette.dark,
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
      small: '0.8em',
      large: '1.4em'
    }
  },
  colours: {
    ...palette
  }
}

export type Theme = DeepReadonly<typeof theme>

export default theme
