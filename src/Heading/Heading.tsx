import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { Icon } from '../Icon'
import { BlockProps, fromTheme, globalBlockSpacing, globalFont, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

enum Levels {
  'header' = 1,
  'section' = 2,
  'sub' = 3
}

export type HeadingType = 'header' | 'section' | 'sub'

interface HeadingProps extends StyledProps {
  type?: HeadingType
  children?: ReactNode
}

const StyledHeading = styled.div<HeadingProps & BlockProps>`
  ${globalFont};
  ${globalBlockSpacing};

  // Add extra specificity when rendered as input
  &, input& {
    ${(props: HeadingProps) => props.type === 'header' && css`
      font-size: ${fromTheme(theme => theme.global.sizes.huge)}em;
    `}

    ${(props: HeadingProps) => props.type === 'section' && css`
      font-size: ${fromTheme(theme => theme.global.sizes.huge)}em;
      color: ${fromTheme(theme => theme.global.purposes.primary)};
    `}

    ${(props: HeadingProps) => props.type === 'sub' && css`
      font-size: ${fromTheme(theme => theme.global.sizes.small)}em;
      text-transform: uppercase;
      color: ${fromTheme(theme => theme.colours.gray)};
      display: table;
      overflow: hidden;
      white-space: nowrap;

      &:after {
        border-top: 1px solid ${fromTheme(theme => theme.colours.lightGray)};
        content: '';
        display: table-cell;
        position: relative;
        top: ${preciseEm(0.6)}em;
        width: 100%;
      }

      &:after { left: 1.5%; }
    `}

  }

  ${Icon} {
    margin-right: ${fromTheme(theme => theme.global.spacing)}em;
    display: inline-block;
    transform: scale(1.5);
    transform-origin: left 25%; // 25% from trial and error
  }
`
export const Heading = ({ type = 'header', ...rest }: HeadingProps) => (
  <StyledHeading
    as={`h${Levels[type]}` as 'h1' | 'h2' | 'h3'}
    type={type}
    {...rest}
  />
)

Heading.displayName = 'Heading'
