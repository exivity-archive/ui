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
    lightest: '#ffffff',
    light: '#f4f4f4',

    grayLightest: '#eeeeee',
    grayLighter: '#e2e2e2',
    grayLight: '#cccccc',
    gray: '#aaaaaa',
    grayDark: '#777777',
    grayDarker: '#444444',
    grayDarkest: '#2e2e2e',

    dark: '#222222',
    darkest: '#000000',

    primaryLightest: '#e6f9ff',
    primaryLighter: '#ccf4ff',
    primaryLight: '#5cccea',
    primary: '#00a8d8',
    primaryDark: '#438dc7',
    primaryDarker: '#2e5f85',
    primaryDarkest: '#192e43',

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
