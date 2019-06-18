import styled, { css } from 'styled-components'
import { textAlign, TextAlignProps } from 'styled-system'

import { globalFont, matchThemeProp, fromTheme, hexToString, PurposesProps, SizesProps, StyledProps } from '../utils/styled'
import { Icon } from '../Icon'
import { Block } from '../Block'
import { animated } from 'react-spring'

interface ContainerProps {
  inline?: boolean
}

export const StyledContainer = styled.div<ContainerProps>`
  position: relative;

  ${props => (props.inline) && css`
    display: inline;
  `}

  ${Icon} {
    pointer-events: none;
  }
`

export interface StyledInputProps extends PurposesProps, SizesProps, StyledProps, TextAlignProps {
  // Variants
  outlined?: boolean
  flat?: boolean

  // Layout
  inline?: boolean
}

export const inputStyles = css<StyledInputProps>`
  ${globalFont};
  ${textAlign};

  font-size: ${matchThemeProp(theme => theme.global.sizes)}rem;

  box-sizing: border-box;
  padding: calc(0.5em - ${fromTheme(theme => theme.global.borderWidth)}px) 0.5em; // subtract border to get a height of exactly 2.5em for single line items

  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
  outline: 0;
  border: 0;

  --focus-color: ${matchThemeProp(theme => theme.global.purposes, { modifier: hexToString })};

  ${props => (!props.inline) && css`
    display: block;
    width: 100%;
  `}

  ${props => (!props.outlined && !props.flat) && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colors.lightGray)};
    background-color: ${fromTheme(theme => theme.colors.lightGray)};

    &:hover {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
    }

    &:focus {
      border-bottom: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
    }
  `}

  ${props => (props.outlined && !props.flat) && css`
    border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${matchThemeProp(theme => theme.global.purposes)};
    background-color: unset;

    &:hover {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colors.gray)};
    }

    &:focus {
      border: ${fromTheme(theme => theme.global.borderWidth)}px solid ${fromTheme(theme => theme.colors.dark)};
    }
  `}

  ${props => props.flat && css<StyledInputProps>`
    padding: 0;

    ${props => props.outlined && css`
      outline-offset: 9px;

      &:hover {
        outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 0.5);
      }

      &:focus {
        outline: ${fromTheme(theme => theme.global.borderWidth)}px solid rgba(var(--focus-color), 1);
      }
    `}
  `}

  &::placeholder {
    color: currentcolor;
    opacity: 0.5;
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: inset 0 0 999em rgba(128, 128, 128, 0.2);
  }
`

export const StyledInput = styled.input<StyledInputProps>`
  ${inputStyles}
`

export const AnimatedStyledInput = animated(StyledInput)
