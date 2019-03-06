import React from 'react'
import styled from 'styled-components'
import { defaultStyledProps, StyledProps } from '../utils/styled'

export interface IconProps extends StyledProps {}

export const Icon = styled.span <IconProps>`
  font-size: ${props => props.theme.global.baseSize}px;
  height: 1em;
  line-height: 1em;
  text-transform: none;
`

Icon.defaultProps = defaultStyledProps
