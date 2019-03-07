import React from 'react'
import styled, { css } from 'styled-components'
import { IconType } from 'react-icons/src'

import { TextInput, TextInputProps, OmitOnChangeHTMLInputAttributes } from '../TextInput/TextInput'
import { matchThemeProp, InputProps } from '../utils/styled'
import { Icon } from '../Icon'

interface TextInputWithIconProps extends TextInputProps {
  icon: IconType
  iconLeft?: boolean
}

interface InputIconProps extends InputProps {
  iconLeft?: boolean
  disabled?: boolean
}

const StyledContainer = styled.div `
  position: relative;
  display: flex;
  justify-content: column;
  align-items: center;
`

const StyledSelectInput = styled(TextInput)<InputIconProps>`
  ${props => props.iconLeft
  ? css`
        padding-left: 2.2em;
      `
  : css`
        padding-right: 2.2em;
      `
  }
`

const InputIcon = styled(Icon)<InputIconProps>`
  position: absolute;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 20,
    defaultValue: 20
  })}px;

  ${props => props.disabled && css`
    cursor: not-allowed;
  `}

  ${props => props.iconLeft
    ? css`
      left: 0.5em;
    `
    : css`
      right: 0.5em;
    `
}
`

export const TextInputWithIcon: React.FC<TextInputWithIconProps & OmitOnChangeHTMLInputAttributes> = ({
    icon,
    iconLeft,
    large,
    small,
    value,
    onChange,
    disabled,
    ...rest
}) => (
  <StyledContainer>
    <StyledSelectInput iconLeft={iconLeft} value={value || ''} onChange={onChange} large={large} small={small}
                       disabled={disabled} {...rest}/>
    <InputIcon iconLeft={iconLeft} large={large} small={small} disabled={disabled}>{icon}</InputIcon>
  </StyledContainer>
)
