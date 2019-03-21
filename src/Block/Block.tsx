import styled from 'styled-components'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  height,
  HeightProps, maxHeight, MaxHeightProps, maxWidth, MaxWidthProps, minHeight, MinHeightProps, minWidth, MinWidthProps,
  space,
  SpaceProps,
  width,
  WidthProps
} from 'styled-system'
import { StyledProps } from '../utils/styled'

export type BlockProps =
  & StyledProps
  & SpaceProps
  & WidthProps
  & MaxWidthProps
  & MinWidthProps
  & HeightProps
  & MaxHeightProps
  & MinHeightProps
  & ColorProps

export const Block = styled.div<BlockProps>`
  ${space}
  ${width}
  ${maxWidth}
  ${minWidth}
  ${height}
  ${maxHeight}
  ${minHeight}
  ${color}
`

Block.displayName = 'Block'
