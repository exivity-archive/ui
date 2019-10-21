import styled, { css, StyledComponent } from 'styled-components'

import { Block } from '../Block'
import { StyledProps } from '../utils/styled'

import { GridItem } from './Item'

export interface GridProps extends StyledProps {
  template?: string
  gap?: string
}

type GridType = StyledComponent<typeof Block, any, GridProps, never> & {
  Item: typeof GridItem
}

export const Grid = styled(Block)<GridProps>`
  display: grid;
  ${props => props.template && css`grid-template: ${props.template};`}
  ${props => props.gap && css`grid-gap: ${props.gap};`}
` as GridType

Grid.Item = GridItem

Grid.displayName = 'Grid'
