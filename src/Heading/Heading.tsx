import React from 'react'
import styled from 'styled-components'
import { defaultStyledProps, globalFont, StyledProps } from '../utils/styled'

interface HeadingProps extends StyledProps {
  level: 1 | 2 | 3
}

const StyledHeading = styled.div<HeadingProps>`
  ${globalFont};
`
export const Heading: React.FC<HeadingProps> = ({ level, ...rest }) => (
  <StyledHeading as={`h${level}` as 'h1' | 'h2' | 'h3'} level={level} {...rest} />
)

Heading.defaultProps = {
  ...defaultStyledProps,
  level: 1
}

Heading.displayName = 'Heading'
