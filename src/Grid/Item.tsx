import styled from 'styled-components'
import { StyledProps } from '../utils/styled'

export interface GridItemProps extends StyledProps {
  area?: string
}

export const GridItem = styled.div<GridItemProps>`
  grid-area: ${props => props.area};
`

GridItem.displayName = 'Grid.Item'
