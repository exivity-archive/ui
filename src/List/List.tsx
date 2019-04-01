import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme, globalSectionSpacing, globalFont, resetBox, StyledProps } from '../utils/styled'

interface ListProps extends StyledProps {
  children?: React.ReactNode
  ordered?: boolean
  unordered?: boolean
}

export const AmbivalentList = styled.div<ListProps>`
  ${resetBox};
  ${globalFont};
  ${globalSectionSpacing};

  ${props => props.ordered && css`
    list-style: decimal;
  `}

  ${props => props.unordered && css`
    list-style: disc;
  `}

  ${props => (props.ordered || props.unordered) && css`
    padding-left: ${fromTheme(theme => theme.global.baseSpacing * 2)}em;
  `}

  ${props => (!props.ordered && !props.unordered) && css`
    list-style: none;
  `}

  li {
    margin-bottom: 0.35em;
  }
`

export const List = ({ ordered, ...rest }: ListProps) => (
  <AmbivalentList as={ordered ? 'ol' : 'ul'} ordered={ordered} {...rest} />
)
