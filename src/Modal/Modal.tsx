import React, { FC } from 'react'
import styled from 'styled-components'
import { fromTheme, defaultStyledProps, StyledProps } from '../utils/styled'
import { Theme } from '../themes'

const ModalWrapper = styled.div`
  position: absolute;
  width: 600px;
`

const Header = styled.div`
  padding: 15px 30px;
  color: ${fromTheme(theme => theme.colours.gray)};
  font-size: 28px;
  font-weight: 700;
`

const Body = styled.div`
  padding: 30px;
  height: 400px;
  border-top: solid 1px ${fromTheme(theme => theme.colours.gray)};
  border-bottom: solid 1px ${fromTheme(theme => theme.colours.gray)};
`

const Footer = styled.div`
  padding: 20px 30px 20px 30px;
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
  <ModalWrapper>
    <Header>{title}</Header>
    <Body>{text}</Body>
    <Footer>{buttons.map((button, i) => (<ButtonWrapper key={i}>{button}</ButtonWrapper>))}</Footer>
  </ModalWrapper>
)
