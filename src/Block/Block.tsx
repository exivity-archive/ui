import styled from 'styled-components'
import {
  border,
  BorderProps,
  color,
  BgColorProps,
  height,
  HeightProps, maxHeight, MaxHeightProps, maxWidth, MaxWidthProps, minHeight, MinHeightProps, minWidth, MinWidthProps,
  space,
  SpaceProps,
  width,
  WidthProps,
  bgColor
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
  & BgColorProps

export const Block = styled.div<BlockProps>`
  ${space}
  ${width}
  ${maxWidth}
  ${minWidth}
  ${height}
  ${maxHeight}
  ${minHeight}
  ${bgColor}
`

Block.displayName = 'Block'
