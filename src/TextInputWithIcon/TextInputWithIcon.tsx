import React from 'react'
import styled, { css } from 'styled-components'
import { IconType } from 'react-icons/src'
import { InputProps, OmitOnChangeHTMLInputAttributes, StyledInputProps } from '../AbstractInput/AbstractInput'
import { Block } from '../Block'

import { TextInput } from '../TextInput'
import { matchThemeProp } from '../utils/styled'
import { Icon } from '../Icon'

export interface TextInputWithIconProps extends InputProps {
  icon: React.ReactElement<null, IconType>
  iconPosition?: IconPosition
}

type IconPosition = 'left' | 'right'

interface InputIconProps extends StyledInputProps {
  iconPosition?: IconPosition
  disabled?: boolean
}

const StyledContainer = styled(Block)`
  position: relative;
  display: flex;
  align-items: center;

  ${Icon} {
    pointer-events: none;
  }
`

const StyledSelectInput = styled(TextInput)<InputIconProps>`
  ${props => props.iconPosition === 'left'
  ? css`
        padding-left: 2.2em;
      `
  : css`
        padding-right: 2.2em;
      `
  }
`

export const InputIcon = styled(Icon)<InputIconProps>`
  position: absolute;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 20
  })}px;

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}

  ${props => props.iconPosition === 'left'
    ? css`
      left: 0.5em;
    `
    : css`
      right: 0.5em;
    `
}
`

export const TextInputWithIcon: React.FC<TextInputWithIconProps & OmitOnChangeHTMLInputAttributes> = ({
  // Icon props
  icon,
  iconPosition = 'right',

  // Props for both TextInput & Icon
  tiny,
  small,
  large,
  huge,
  disabled,

  // Container props
  onClick,
  width,

  // Rest goes to TextInput
  ...rest
}) => {
  const container = { onClick, width }
  const shared = { tiny, small, large, huge, disabled }
  return <StyledContainer {...container}>
    <StyledSelectInput iconPosition={iconPosition} {...shared} {...rest} />
    <InputIcon iconPosition={iconPosition} {...shared}>
      {icon}
    </InputIcon>
  </StyledContainer>
}
