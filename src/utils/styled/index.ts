import color from 'color'
import { css } from 'styled-components'
import { lightTheme, Theme } from '../../themes'

type ThemeResolver = (theme: Theme) => any

interface ThemeHelperOptions {
  defaultValue?: any
  modifier?: Function
}

export interface StyledProps {
  theme?: Theme
}

export const defaultStyledProps = { theme: lightTheme }

export interface InputProps extends StyledProps {
  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean

  // Sizes
  tiny?: boolean
  small?: boolean
  large?: boolean

  // Variants
  outlined?: boolean
}

export const fromTheme = (themeResolver: ThemeResolver) => (props: StyledProps) => {
  return props.theme ? themeResolver(props.theme) : themeResolver(lightTheme)
}

export const matchThemeProp = (
  themeResolver: ThemeResolver,
  options: ThemeHelperOptions = {}
) => (props: any) => {
  const themeObject = themeResolver(props.theme)
  let match = Object.keys(props)
    .find((propKey: string) => {
      const prop = props[propKey]
      if (prop !== undefined) {
        return themeObject[propKey]
      }
    })

  if (!match && options.defaultValue) {
    match = options.defaultValue
  }

  if (!match) return null

  if (themeObject[match]) {
    return options.modifier
      ? options.modifier(themeObject[match])
      : themeObject[match]
  }

  return match
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

export const globalInput = css<InputProps & { outlined?: boolean }>`
  ${globalFont};

  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 16,
    defaultValue: 16
  })}px;

  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: calc(0.5em - ${fromTheme(theme => theme.global.borderWidth)}px) 0.5em; // subtract border to get a height of exactly 2.5em for single line items

  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  outline: 0;
  border: 0;

  ${props => props.outlined
    ? css`
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid
        ${matchThemeProp(theme => theme.global.purposes, { defaultValue: 'primary' })};
      background-color: unset;

      &:hover {
        border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.gray)};
      }

      &:focus {
        border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.dark)};
      }
    `
    : css `
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.lightGray)};
      background-color: ${fromTheme(theme => theme.colours.lightGray)};

      &:hover {
        border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
      }

      &:focus {
        border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
      }
    `}

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, {
    modifier: hexToString,
    defaultValue: 'primary'
  })};

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`
