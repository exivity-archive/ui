import styled, { css } from 'styled-components'

import { Block, BlockProps } from '../Block'

export interface FlexItemProps extends BlockProps {
  order?: string | number
  grow?: string | number
  shrink?: string | number
  basis?: string | number
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
}

export const FlexItem = styled(Block)<FlexItemProps>`
  ${props => props.order && css`order: ${props.order};`}
  ${props => props.grow && css`flex-grow: ${props.grow};`}
  ${props => props.shrink && css`flex-shrink: ${props.shrink};`}
  ${props => props.basis && css`flex-basis: ${props.basis};`}
  ${props => props.alignSelf && css`align-self: ${props.alignSelf};`}
`

FlexItem.displayName = 'FlexItem'
