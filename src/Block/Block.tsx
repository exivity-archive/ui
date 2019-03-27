import styled from 'styled-components'
import {
  color,
  ColorProps,
  height,
  HeightProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps, size,
  SizeProps,
  space,
  SpaceProps,
  width,
  WidthProps
} from 'styled-system'
import { StyledProps } from '../utils/styled'

export type BlockProps =
  & StyledProps
  & SpaceProps
  & SizeProps
  & WidthProps
  & MaxWidthProps
  & MinWidthProps
  & HeightProps
  & MaxHeightProps
  & MinHeightProps
  & ColorProps
& {
  color?: any
}

export const Block = styled.div<BlockProps>`
  ${space}
  ${size}
  ${width}
  ${maxWidth}
  ${minWidth}
  ${height}
  ${maxHeight}
  ${minHeight}
  ${color}
`

Block.displayName = 'Block'
