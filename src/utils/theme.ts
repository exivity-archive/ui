import color from 'color'
import { BASE_SIZE, Theme } from '../theme'
import { StyledProps } from './types'

type ThemeResolver = (theme: Theme) => any

export const fromTheme = (themeResolver: ThemeResolver) => (props: StyledProps) => {
  return themeResolver(props.theme)
}

export const matchThemeProp = (themeResolver: ThemeResolver, modifier?: Function) => (props: StyledProps) => {
  const themeObject = themeResolver(props.theme)
  const match = Object.keys(props).find(propKey => themeObject[propKey])
  return match && (modifier
    ? modifier(themeObject[match])
    : themeObject[match])
}

export const hexToString = (hex: string) => {
  try {
    return color(hex).rgb().array().join(', ')
  } catch (err) {
    return '0, 0, 0'
  }
}

export const preciseRm = (fraction: number, size = BASE_SIZE) => {
  const rounded = Math.round(size * fraction)

  return rounded / size
}
