import { ButtonHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { Icon } from '../Icon'
import {
  fromTheme,
  matchThemeProp,
  PurposesProps,
  SizesProps,
  StyledProps,
  toRgbCss,
  toRgbString
} from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PurposesProps, SizesProps, StyledProps {
  // Variants
  round?: boolean
  transparent?: boolean
  outlined?: boolean
  flat?: boolean

  // Layout
  inline?: boolean
}

export const Button = styled.button<ButtonProps>`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: 500;
  font-size: ${matchThemeProp(
  theme => theme.global.sizes, { modifier: (em: number) => em / 16 * 14 })}em;

  line-height: ${fromTheme(theme => theme.global.lineHeight)};
  min-width: 2.5em;
  height: ${matchThemeProp(theme => theme.button.heights)}em;
  padding: 0 ${preciseEm(1.5)}em;

  text-transform: uppercase;
  display: inline-flex;
  position: relative;
  appearance: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  flex: none;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  outline: none;

  color: ${fromTheme(theme => theme.colors.white)};
  background-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: toRgbCss })};
  --focus-color-rgb: ${matchThemeProp(theme => theme.global.purposes, { modifier: toRgbString })};

  &:hover {
    box-shadow: inset 10px 10px 999em rgba(0,0,0,${fromTheme(theme => theme.global.shadowAlpha)});
  }

  &:focus {
    box-shadow: inset 0 0 999em rgba(0,0,0,${fromTheme(theme => theme.global.shadowAlpha)}),
      0 0 0 ${fromTheme(theme => theme.global.outlineWidth)}px rgba(var(--focus-color-rgb), ${fromTheme(
  theme => theme.global.outlineAlpha)});
  }

  &:active,
  &.active {
    box-shadow: inset 0 0 999em rgba(0,0,0,${fromTheme(theme => theme.global.shadowAlpha * 2)}),
      0 0 0 ${fromTheme(theme => theme.global.outlineWidth)}px rgba(var(--focus-color-rgb), ${fromTheme(
  theme => theme.global.outlineAlpha)});
  }

  &:after {
    display: none;
    content: "";
    position: absolute;
    top: -${fromTheme(theme => theme.global.borderWidth)}px;
    right: -${fromTheme(theme => theme.global.borderWidth)}px;
    bottom: -${fromTheme(theme => theme.global.borderWidth)}px;
    left: -${fromTheme(theme => theme.global.borderWidth)}px;
    border-radius: inherit;
    background-color: rgba(255, 255, 255, 0.5);
  }

  &[disabled] {
    pointer-events: none;
    &:after {
      display: block;
    }
  }

  ${(props: ButtonProps) => props.outlined && css`
    background-color: transparent;
    color: ${matchThemeProp(theme => theme.global.purposes)};
    box-shadow: 0 0 0 ${fromTheme(theme => theme.global.borderWidth)}px ${matchThemeProp(
  theme => theme.global.purposes)};

    &:hover {
      color: ${fromTheme(theme => theme.global.textColor)};
      box-shadow: 0 0 0 ${fromTheme(theme => theme.global.borderWidth)}px ${fromTheme(theme => theme.global.textColor)};
    }

    &:focus {
      box-shadow: 0 0 0 ${fromTheme(theme => theme.global.borderWidth)}px ${matchThemeProp(
  theme => theme.global.purposes)},
       0 0 0 ${fromTheme(theme => theme.global.outlineWidth + 1)}px rgba(var(--focus-color-rgb), ${fromTheme(
  theme => theme.global.outlineAlpha)});
    }
  `}

  ${(props: ButtonProps) => props.round && css`
    border-radius: 50%;
    min-width: auto;
    padding: 0;
    width: ${matchThemeProp(theme => theme.button.heights)}em;
  `}

  ${Icon} {
    font-size: 1.5em;
    ${(props: ButtonProps) => props.round !== true && css`
      margin-right: ${fromTheme(theme => theme.global.baseSpacing / 2)}em;
    `}
  }

  ${(props: ButtonProps) => props.transparent && css`
    background-color: transparent;
  `}
`
