import styled, { css } from 'styled-components'
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
  MinWidthProps,
  size,
  SizeProps,
  space,
  SpaceProps,
  width,
  WidthProps
} from 'styled-system'
import { StyledProps } from '../utils/styled'

export interface OverrideColorProps {
  color?: any
}

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
  & OverrideColorProps

export const blockStyles = css`
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

export const Block = styled.div<BlockProps>`
  ${blockStyles}
`

Block.displayName = 'Block'
