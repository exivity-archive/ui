import React from 'react'
import styled from 'styled-components'
import { StyledProps } from '../utils/styled'

export interface IconProps extends StyledProps {
  offSet?: number
}

export const Icon = styled.span.attrs<IconProps>(({ offSet = 0 }) => ({
  offSet
}))<IconProps>`
  position: relative;
  height: 1em;
  line-height: 1em;
  text-transform: none;
  top: ${({ offSet }) => offSet}px;
`
