import React, { FC } from 'react'
import styled from 'styled-components'

import { fromTheme } from '../utils/styled'
import { Button } from '../Button'
import { Heading } from '../Heading'

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.1);
  position: absolute;
  z-index: ${fromTheme(theme => theme.global.zPriority.foreground)};
`

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
  border-top: solid 1px ${fromTheme(theme => theme.colors.gray)};
  border-bottom: solid 1px ${fromTheme(theme => theme.colors.gray)};
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
  title: string
  children: React.ReactNode
  buttons: JSX.Element[]
}

export const Modal: FC<ModalProps> = ({ title, children, buttons = [], ...rest }) => (
  <Overlay {...rest}>
    <ModalWrapper>
      <Header>
        <Heading>{title}</Heading>
      </Header>
      <Body>{children}</Body>
      <Footer>{React.Children.map(buttons,
        (child, index) => React.cloneElement(child, { ...child.props, key: index }))}</Footer>
    </ModalWrapper>
  </Overlay>
)
