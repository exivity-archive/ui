import color from 'color'
import { css } from 'styled-components'
import { Theme } from '../defaultTheme/theme'
import { StyledProps } from './types'

type ThemeResolver = (theme: Theme) => any

export const globalFont = css`
  font-family: ${(props: StyledProps) => props.theme.global.fontFamily};
  font-weight: normal;
  font-size: ${(props: StyledProps) => props.theme.global.baseSize}px;
  color: ${(props: StyledProps) => props.theme.global.textColor};
  line-height: ${(props: StyledProps) => props.theme.global.lineHeight};
`

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
