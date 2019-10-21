import React, { FC, ReactNode, Children, cloneElement } from 'react'
import styled from 'styled-components'

import { fromTheme } from '../utils/styled'

import { Overlay, Button, Heading } from '..'

const ModalWrapper = styled.div`
  position: absolute;
  width: 600px;
  background-color: ${fromTheme(theme => theme.colors.white)};
  left: calc((100vw - 600px) / 2);
  top: 50px;
`

const Header = styled.div`
  padding: ${fromTheme(theme => theme.global.baseSpacing)}em ${fromTheme(theme => theme.global.baseSpacing * 1.5)}em;
`

const Body = styled.div`
  padding: ${fromTheme(theme => theme.global.baseSpacing * 1.5)}em;
  max-height: 400px;
  border-top: solid 1px ${fromTheme(theme => theme.colors.lightGray)};
  border-bottom: solid 1px ${fromTheme(theme => theme.colors.lightGray)};
  overflow-y: auto;
`

const Footer = styled.div`
  padding: ${fromTheme(theme => theme.global.baseSpacing)}em ${fromTheme(theme => theme.global.baseSpacing * 2)}em;
  color: ${fromTheme(theme => theme.colors.gray)};
  display: flex;
  flex-direction: row-reverse;
  ${Button} {
    margin-left: 20px;
  }
`

interface ModalProps {
  title?: ReactNode
  children?: ReactNode
  buttons?: JSX.Element[]
}

export const Modal: FC<ModalProps> = ({ title, children, buttons, ...rest }) => (
  <Overlay {...rest}>
    <ModalWrapper>
      {title && <Header>{typeof title === 'string' ? <Heading>{title}</Heading> : title}</Header>}
      {children && <Body>{children}</Body>}
      {buttons && (
        <Footer>{Children.map(buttons, (child, index) => cloneElement(child, { ...child.props, key: index }))}</Footer>
      )}
    </ModalWrapper>
  </Overlay>
)
