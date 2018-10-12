import * as constants from './constants'

const theme = {
  size: constants.SIZE_DEFAULT,
  spacing: constants.SPACING_DEFAULT,
  lineHeight: 1.5,
  fonts: {
    url: 'https://fonts.googleapis.com/css?family=Fira+Mono|Fira+Sans+Condensed:500|Fira+Sans:400,600',
    base: {
      family: '\'Fira Sans\', sans-serif',
      weight: 400,
      weightBold: 600
    },
    interaction: {
      family: '\'Fira Sans Condensed\', sans-serif',
      weight: 500
    },
    code: {
      family: '\'Fira Mono\', monospace',
      weight: 400
    }
  },
  colours: {
    bg: '#ffffff',
    text: '#222222',

    primary: '#00a8d8',

    danger: '#c33c32',
    warning: '#ffca71',
    success: '#238e47',

    mark: '#fdf6e3'
  },
  border: {
    radius: '3px'
  }
}

export default theme
