import styled, { css } from 'styled-components'
import { Block, BlockProps } from '../Block'

export interface GridItemProps extends BlockProps {
  area?: string
}

export const GridItem = styled(Block)<GridItemProps>`
  ${props => props.area && css`grid-area: ${props.area};`}
`

GridItem.displayName = 'GridItem'
