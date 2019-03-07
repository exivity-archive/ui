import React from 'react'
import styled, { css } from 'styled-components'
import { defaultStyledProps, fromTheme, globalFont, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

enum Levels {
  'header' = 1,
  'screen' = 2,
  'section' = 3
}

interface HeadingProps extends StyledProps {
  type: 'header' | 'screen' | 'section'
}

const StyledHeading = styled.div<HeadingProps>`
  ${globalFont};

  margin: 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${(props: HeadingProps) => props.type === 'header' && css`
    font-size: ${preciseEm(1.5)}em;
  `}

  ${(props: HeadingProps) => props.type === 'screen' && css`
    font-size: ${preciseEm(1.5)}em;
    color: ${fromTheme(theme => theme.global.purposes.primary)};
  `}

  ${(props: HeadingProps) => props.type === 'section' && css`
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
`
export const Heading: React.FC<HeadingProps> = ({ type, ...rest }: HeadingProps) => (
  <StyledHeading as={`h${Levels[type]}` as 'h1' | 'h2' | 'h3'} type={type} {...rest} />
)

Heading.defaultProps = {
  ...defaultStyledProps
}

Heading.displayName = 'Heading'
