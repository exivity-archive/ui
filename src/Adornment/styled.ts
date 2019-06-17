import styled, { css } from 'styled-components'

import { SizesProps, matchThemeProp } from '../utils/styled'
import { Position } from './Adornment'
import { Block } from '../Block'

export interface StyledAdornmentProps {
  position: Position
  inset: number | string
}

export const StyledAdornment = styled.span <StyledAdornmentProps>`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
  font-size: ${
  matchThemeProp(
    theme => theme.global.sizes,
    { modifier: (em: number) => em * 20 }
  )}px;

  ${props => props.position === Position.LEFT
    ? css`left: ${props.inset}px;`
    : css`right: ${props.inset}px;`
  }
`

export const AdornmentWrapper = styled(Block)`
  position: relative;
  display: inline-block;
`
