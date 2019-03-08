import React from 'react'
import styled from 'styled-components'
import { StyledProps } from '../utils/styled'

export interface IconProps extends StyledProps {}

export const Icon = styled.span<IconProps>`
  height: 1em;
  line-height: 1em;
  text-transform: none;
`
