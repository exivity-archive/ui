import React, { FC } from 'react'
import styled from 'styled-components'
import { fromTheme } from '../utils/styled'

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.1);
  position: absolute;
`

const ModalWrapper = styled.div`
  position: absolute;
  width: 600px;
  background-color: ${fromTheme(theme => theme.colours.white)};
  left: calc((100vw - 600px) / 2);
  top: 50px;
`

const Header = styled.div`
  padding: 25px 30px 20px 30px;
  color: ${fromTheme(theme => theme.colours.gray)};
  font-size: 28px;
  font-weight: 700;
`

const Body = styled.div`
  padding: 30px;
  height: 400px;
  border-top: solid 1px ${fromTheme(theme => theme.colours.gray)};
  border-bottom: solid 1px ${fromTheme(theme => theme.colours.gray)};
  overflow-y: auto;
`

const Footer = styled.div`
  padding: 15px 30px;
  color: ${fromTheme(theme => theme.colours.gray)};
  display: flex;
  flex-direction: row-reverse;
`

const ButtonWrapper = styled.div`
  margin-left: 20px;
`

interface ModalProps {
  title: string
  text: string
  buttons: React.ReactElement[]
}

export const Modal: FC<ModalProps> = ({ title, text, buttons = [] }) => (
  <Overlay>
    <ModalWrapper>
      <Header>{title}</Header>
      <Body>{text}</Body>
      <Footer>{buttons.map((button, i) => (<ButtonWrapper key={i}>{button}</ButtonWrapper>))}</Footer>
    </ModalWrapper>
  </Overlay>
)
