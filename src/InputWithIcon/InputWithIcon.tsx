import React from 'react'
import styled, { css } from 'styled-components'
import { IconType } from 'react-icons/src'
import { InputProps, OmitOnChangeHTMLInputAttributes, StyledInputProps, AbstractInput } from '../AbstractInput/AbstractInput'
import { Block } from '../Block'

import { matchThemeProp, SizesProps } from '../utils/styled'
import { Icon } from '../Icon'

export interface InputWithIconProps extends StyledInputProps, InputProps {
  iconLeft?: React.ReactElement<null, IconType>
  iconRight?: React.ReactElement<null, IconType>
  disabled?: boolean
}

type IconPosition = 'left' | 'right'

interface InputIconProps extends SizesProps {
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

const StyledInputWithIcon = styled(AbstractInput) <InputWithIconProps>`
  ${props => (!props.iconRight) && css`
    padding-left: 2.2em;
  `}
  ${props => (!props.iconLeft) && css`
    padding-right: 2.2em;
  `}
`

export const InputIcon = styled(Icon) <InputIconProps>`
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

export const InputWithIcon: React.FC<InputWithIconProps & OmitOnChangeHTMLInputAttributes> = ({
  // Icon props
  iconLeft,
  iconRight,

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
    <StyledInputWithIcon iconLeft={iconLeft} iconRight={iconRight} {...shared} {...rest} />
    {!!iconRight && (
      <InputIcon iconPosition='right' {...shared} offSet={10}>
        {iconRight}
      </InputIcon>
    )}
    {!!iconLeft && (
      <InputIcon iconPosition='left' {...shared} offSet={10}>
        {iconLeft}
      </InputIcon>
    )}
  </StyledContainer>
}
