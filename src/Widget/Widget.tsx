import * as React from 'react'
import styled from 'styled-components'
import { fromTheme, globalFont, hexToString, resetBox, StyledProps } from '../utils/styled'

const Title = styled.h4`
  ${resetBox};
  ${globalFont};

  font-size: ${fromTheme(theme => theme.global.sizes.huge)}em;
  color: ${fromTheme(theme => theme.global.purposes.primary)};
`

const Wrapper = styled.div`
  background: white;
  box-shadow: 1px 1px 0 rgba(${fromTheme(theme => hexToString(theme.global.purposes.primary))},0.4);
  padding: ${fromTheme(theme => theme.global.spacing * 1.5)}em;
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
`

interface WidgetProps extends StyledProps {
  title?: string
}

export const Widget: React.FC<WidgetProps> = ({ children, title }) => (
  <Wrapper>
    {title && <Title>{title}</Title>}
    {children}
  </Wrapper>
)
