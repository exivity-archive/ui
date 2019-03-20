import styled from 'styled-components'
import { Block, BlockProps } from '../Block'

export interface GridItemProps extends BlockProps {
  area?: string
}

export const GridItem = styled(Block)<GridItemProps>`
  grid-area: ${props => props.area};
`

GridItem.displayName = 'Grid.Item'
