import React from 'react'
import styled from 'styled-components'
import { defaultStyledProps, fromTheme, StyledProps } from '../utils/styled'

export interface IconProps extends StyledProps {}

export const Icon = styled.span <IconProps>`
  height: 1em;
  line-height: 1em;
  text-transform: none;
`

Icon.defaultProps = defaultStyledProps
