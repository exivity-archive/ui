import * as React from 'react'

import styled from 'styled-components';

interface IButtonProps {
  children: React.ReactNode
  className?: string
  onClick: () => void
}

const Button: React.FC<IButtonProps> = ({ children, className, onClick }) => (
  <button className={className} onClick={onClick}>{children}</button>
)

export default styled(Button)`
  font-family: inherit;
  color: #444444;
  height: 36px;
  width: 140px;
  background-color: #F4F4F4;
  border: none;
  outline: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
`