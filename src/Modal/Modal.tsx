import React, { FC } from 'react'
import styled from 'styled-components'
import { fromTheme, defaultStyledProps, StyledProps } from '../utils/styled'
import { Button } from '../Button'

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

const Body = styled.div`
  padding: ${fromTheme(theme => theme.global.spacing * 1.5)}em;
  max-height: 400px;
  border-top: solid 1px ${fromTheme(theme => theme.colours.gray)};
  border-bottom: solid 1px ${fromTheme(theme => theme.colours.gray)};
  overflow-y: auto;
`

const Footer = styled.div`
  padding: ${fromTheme(theme => theme.global.spacing)}em ${fromTheme(theme => theme.global.spacing * 2)}em;
  color: ${fromTheme(theme => theme.colours.gray)};
  display: flex;
  flex-direction: row-reverse;
  ${Button} {
    margin-left: 20px;
  }
`

interface ModalProps extends StyledProps {
  title: string
  children: React.ReactNode
  buttons: React.ReactElement[]
}


const PlainModal: FC<ModalProps> = ({ title, children, buttons = [] }) => (
  <Overlay>
    <ModalWrapper>
      <Body>{children}</Body>
      <Footer>{buttons}</Footer>
    </ModalWrapper>
  </Overlay>
)

export const Modal = styled(PlainModal)

PlainModal.defaultProps = {
  ...defaultStyledProps
}
