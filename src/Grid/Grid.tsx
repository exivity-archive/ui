import styled from 'styled-components'
import { StyledProps } from '../utils/styled'

export interface GridProps extends StyledProps {
  template?: string
  gap?: string
}

export const Grid = styled.div<GridProps>`
  grid-template: ${props => props.template};
  grid-gap: ${props => props.gap};
`

Grid.displayName = 'Grid'
