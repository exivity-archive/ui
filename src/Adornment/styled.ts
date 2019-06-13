import styled, { css } from 'styled-components'

import { SizesProps, matchThemeProp } from '../utils/styled'
import { Position } from './Adornment'
import { Block } from '../Block'

export interface StyledAdornmentProps extends SizesProps {
  position: Position
}

export const StyledAdornment = styled.span <StyledAdornmentProps>`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  height: 100%;
  font-size: ${matchThemeProp(theme => theme.global.sizes, {
    modifier: (em: number) => em * 20
  })}px;
   ${props => props.position === Position.LEFT
    ? css`
    left: 0.5em;
  `
    : css`
    right: 0.5em;
  `}
`

export const AdornmentWrapper = styled(Block)`
  position: relative;
`
