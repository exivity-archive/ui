import styled, { css, StyledComponent } from 'styled-components'
import { Block, BlockProps } from '../Block'
import { FlexItem } from './Item'

export interface FlexProps extends BlockProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
}

type FlexType = StyledComponent<typeof Block, any, FlexProps, never> & {
  Item: typeof FlexItem
}

export const Flex = styled(Block)<FlexProps>`
  display: flex;
  ${props => props.direction && css`flex-direction: ${props.direction};`}
  ${props => props.wrap && css`flex-wrap: ${props.wrap};`}
  ${props => props.justifyContent && css`justify-content: ${props.justifyContent};`}
  ${props => props.alignItems && css`align-items: ${props.alignItems};`}
  ${props => props.alignContent && css`align-content: ${props.alignContent};`}
` as FlexType

Flex.Item = FlexItem

Flex.displayName = 'Flex'
