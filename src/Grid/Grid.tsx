import styled, { StyledComponent } from 'styled-components'
import { StyledProps } from '../utils/styled'
import { GridItem } from './Item'

export interface GridProps extends StyledProps {
  template?: string
  gap?: string
}

type GridType = StyledComponent<'div', any, GridProps, never> & {
  Item: typeof GridItem
}

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template: ${props => props.template};
  grid-gap: ${props => props.gap};
` as GridType

Grid.Item = GridItem

Grid.displayName = 'Grid'
