import color from 'color'
import { css } from 'styled-components'
import { lightTheme, Theme } from '../../themes'
import { preciseEm } from './isolated'

type ThemeResolver = (theme: Theme) => any

interface ThemeHelperOptions {
  defaultValue?: any
  modifier?: Function
}

export interface StyledProps {
  theme?: Theme
}

export const defaultStyledProps = {
  theme: lightTheme
}

export interface BlockProps {
  noMargin?: boolean
}

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
  inlined?: boolean
}

export const fromTheme = (themeResolver: ThemeResolver) => (props: StyledProps) => {
  return themeResolver(props.theme)
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

export const globalBlockSpacing = css`
  margin: ${(props: BlockProps) => props.noMargin ? 0 : preciseEm(1)}rem 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const globalFont = css`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: normal;
  font-size: ${fromTheme(theme => theme.global.baseSize)}px;
  color: ${fromTheme(theme => theme.global.textColor)};
  line-height: ${fromTheme(theme => theme.global.lineHeight)};
`

export const globalInput = css<InputProps>`
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

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  ${props => (!props.outlined && !props.inlined) && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.lightGray)};
    background-color: ${fromTheme(theme => theme.colours.lightGray)};

    &:hover {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
    }

    &:focus {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
    }
  `}

  ${props => props.outlined && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${matchThemeProp(theme => theme.global.purposes)};
    background-color: unset;

    &:hover {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.gray)};
    }

    &:focus {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colours.dark)};
    }
  `}

  ${props => props.inlined && css`
    padding: 0;

    &:hover {
      outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
      outline-offset: 9px;
    }

    &:focus {
      outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
      outline-offset: 9px;
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
