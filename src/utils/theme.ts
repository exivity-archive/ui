import color from 'color'
import { css } from 'styled-components'
import { Theme } from '../defaultTheme/theme'

type ThemeResolver = (theme: Theme) => any

interface ThemeHelperOptions {
  defaultValue?: any
  modifier?: Function
}

export interface StyledProps {
  theme: Theme
}

export const fromTheme = (
  themeResolver: ThemeResolver,
  options: ThemeHelperOptions = {}
) => (props: StyledProps) => {
  const resolved = options.modifier
    ? options.modifier(themeResolver(props.theme))
    : themeResolver(props.theme)

  return resolved || options.defaultValue
}

export const matchThemeProp = (
  themeResolver: ThemeResolver,
  options: ThemeHelperOptions = {}
) => (props: StyledProps) => {
  const themeObject = themeResolver(props.theme)
  const match = Object.keys(props)
    .find(propKey => themeObject[propKey])

  if (!match) {
    return options.defaultValue
  }

  return options.modifier
    ? options.modifier(themeObject[match])
    : themeObject[match]
}

export const hexToString = (hex: string) => {
  try {
    return color(hex).rgb().array().join(', ')
  } catch (err) {
    return '0, 0, 0'
  }
}

export const globalFont = css`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: normal;
  font-size: ${fromTheme(theme => theme.global.baseSize)}px;
  color: ${fromTheme(theme => theme.global.textColor)};
  line-height: ${fromTheme(theme => theme.global.lineHeight)};
`
