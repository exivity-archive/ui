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

export interface InputProps extends StyledProps {
  outlined?: boolean

  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean

  // Sizes
  small?: boolean
  large?: boolean
}

export const matchThemeProp = (
  themeResolver: ThemeResolver,
  options: ThemeHelperOptions = { }
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
  font-family: ${props => props.theme.global.fontFamily};
  font-weight: normal;
  font-size: ${props => props.theme.global.baseSize}px;
  color: ${props => props.theme.global.textColor};
  line-height: ${props => props.theme.global.lineHeight};
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
  padding: calc(0.5em - ${props => props.theme.global.borderWidth}px) 0.5em; // subtract border to get a height of exactly 2.5em for single line items

  border-radius: ${props => props.theme.global.borderRadius}px;
  outline: 0;
  border: 0;

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  ${props => props.outlined
    ? css`
      border: ${props => props.theme.global.borderWidth}px solid ${matchThemeProp(theme => theme.global.purposes)};
      background-color: unset;

      &:hover {
        border: ${props => props.theme.global.borderWidth}px solid ${props => props.theme.colours.gray};
      }

      &:focus {
        border: ${props => props.theme.global.borderWidth}px solid ${props => props.theme.colours.dark};
      }
    `
    : css `
      border: ${props => props.theme.global.borderWidth}px solid ${props => props.theme.colours.lightGray};
      background-color: ${props => props.theme.colours.lightGray};

      &:hover {
        border-bottom: ${props => props.theme.global.borderWidth}px solid rgba(var(--focus-color), 0.5);
      }

      &:focus {
        border-bottom: ${props => props.theme.global.borderWidth}px solid rgba(var(--focus-color), 1);
      }
    `}

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`
