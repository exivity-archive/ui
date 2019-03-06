import React from 'react'
import styled, { css } from 'styled-components'
import Icon from '../Icon'
import { defaultStyledProps, hexToString, matchThemeProp, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

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

export const Button = styled.button <ButtonProps>`
  font-family: ${props => props.theme.global.fontFamily};
  font-weight: 500;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 14,
    defaultValue: 14
  })}px;
  color: ${props => props.theme.colours.white};
  line-height: ${props => props.theme.global.lineHeight};

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
  border-radius: ${props => props.theme.global.borderRadius}px;
  flex: none;
  user-select: none;
  white-space: nowrap;
  text-decoration: none;
  outline: none;

  background-color: ${matchThemeProp(theme => theme.global.purposes)};
  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  &:hover {
    box-shadow: inset 10px 10px 999em rgba(0,0,0,${props => props.theme.global.shadowAlpha});
  }

  &:focus {
    box-shadow: inset 0 0 999em rgba(0,0,0,${props => props.theme.global.shadowAlpha}),
      0 0 0 ${props => props.theme.global.outlineWidth}px rgba(var(--focus-color), ${props => props.theme.global.outlineAlpha});
  }

  &:active,
  &.active {
    box-shadow: inset 0 0 999em rgba(0,0,0,${props => props.theme.global.shadowAlpha * 2}),
      0 0 0 ${props => props.theme.global.outlineWidth}px rgba(var(--focus-color), ${props => props.theme.global.outlineAlpha});
  }

  &:after {
    display: none;
    content: "";
    position: absolute;
    top: -${props => props.theme.global.borderWidth}px;
    right: -${props => props.theme.global.borderWidth}px;
    bottom: -${props => props.theme.global.borderWidth}px;
    left: -${props => props.theme.global.borderWidth}px;
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
    background-color: ${props => props.theme.colours.white};
    color: ${matchThemeProp(theme => theme.global.purposes)};
    box-shadow: 0 0 0 ${props => props.theme.global.borderWidth}px ${matchThemeProp(theme => theme.global.purposes)};

    &:hover {
      color: ${props => props.theme.global.textColor};
      box-shadow: 0 0 0 ${props => props.theme.global.borderWidth}px ${props => props.theme.global.textColor};
    }

    &:focus {
      box-shadow: 0 0 0 ${props => props.theme.global.borderWidth}px ${matchThemeProp(theme => theme.global.purposes)},
       0 0 0 ${props => props.theme.global.outlineWidth + 1}px rgba(var(--focus-color), ${props => props.theme.global.outlineAlpha});
    }
  `}

  ${Icon} {
    margin-right: ${props => props.theme.global.spacing / 2}em;
  }
`

Button.defaultProps = {
  ...defaultStyledProps,
  primary: true
}

export default Button
