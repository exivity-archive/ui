import React from 'react'
import styled from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { fromTheme, StyledProps } from '../utils/theme'

export interface IconProps extends StyledProps {}

export const Icon = styled.span<IconProps>`
  font-size: ${fromTheme(theme => theme.global.baseSize)}px;
  height: 1em;
  line-height: 1em;
  text-transform: none;
`

Icon.defaultProps = defaultStyledProps

export default Icon