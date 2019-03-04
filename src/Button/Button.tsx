import React from 'react'
import styled, { css } from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { fromTheme, hexToString, matchThemeProp, StyledProps } from '../utils/theme'
import { preciseEm } from '../utils/theme/isolated'
import Icon from '../Icon'

export interface ButtonProps extends StyledProps {
  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean

  // Sizes
  small?: boolean
  large?: boolean

  // Variants
  outlined?: boolean
}

export const Button = styled.button<ButtonProps>`
  font-family: ${fromTheme(theme => theme.global.fontFamily)};
  font-weight: 500;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 14,
    defaultValue: 14
  })}px;
  color: ${fromTheme(theme => theme.colours.white)};
  line-height: ${fromTheme(theme => theme.global.lineHeight)};

  text-transform: uppercase;
  display: inline-flex;
  position: relative;
  appearance: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 2.5em;
  height: ${preciseEm(2.85, 14)}em; // 40px = 2.5 * 16
  padding: 0 ${preciseEm(1.5)}em;
  border: none;
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  flex: none;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  outline: none;

  background-color: ${matchThemeProp(theme => theme.global.purposes)};
  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  &:hover {
    box-shadow: inset 10px 10px 999em rgba(0,0,0,${fromTheme(theme => theme.global.shadowAlpha)});
  }

  &:focus {
    box-shadow: inset 0 0 999em rgba(0,0,0,${fromTheme(theme => theme.global.shadowAlpha)}),
      0 0 0 ${fromTheme(theme => theme.global.outlineWidth)}px rgba(var(--focus-color), ${fromTheme(theme => theme.global.outlineAlpha)});
  }

  &:active,
  &.active {
    box-shadow: inset 0 0 999em rgba(0,0,0,${fromTheme(theme => theme.global.shadowAlpha * 2)}),
      0 0 0 ${fromTheme(theme => theme.global.outlineWidth)}px rgba(var(--focus-color), ${fromTheme(theme => theme.global.outlineAlpha)});
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

  ${props => props.outlined && css`
    background-color: ${fromTheme(theme => theme.colours.white)};
    color: ${matchThemeProp(theme => theme.global.purposes)};
    box-shadow: 0 0 0 ${fromTheme(theme => theme.global.borderWidth)}px ${matchThemeProp(theme => theme.global.purposes)};

    &:hover {
      color: ${fromTheme(theme => theme.global.textColor)};
      box-shadow: 0 0 0 ${fromTheme(theme => theme.global.borderWidth)}px ${fromTheme(theme => theme.global.textColor)};
    }

    &:focus {
      box-shadow: 0 0 0 ${fromTheme(theme => theme.global.borderWidth)}px ${matchThemeProp(theme => theme.global.purposes)},
       0 0 0 ${fromTheme(theme => theme.global.outlineWidth + 1)}px rgba(var(--focus-color), ${fromTheme(theme => theme.global.outlineAlpha)});
    }
  `}

  ${Icon} {
    margin-right: ${fromTheme(theme => theme.global.spacing / 2)}em;
  }
`

Button.defaultProps = {
  ...defaultStyledProps,
  primary: true
}

export default Button
