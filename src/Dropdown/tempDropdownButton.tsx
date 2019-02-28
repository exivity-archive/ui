import * as React from 'react'

import styled from 'styled-components'

const SelectedValue = styled.div`
  padding-top: 3px;
  float: left;
`

interface IDropdownButtonProps {
  value?: string
  className?: string
  onClick?: () => void
}

const DropdownButton: React.FC<IDropdownButtonProps> = ({ value, className, onClick }) => (
  <button className={className} onClick={onClick}>
    <SelectedValue >{value}</SelectedValue>
  </button>
)

export default styled(DropdownButton)`
  font-family: inherit;
  color: #444444;
  height: 30px;
  width: 330px;
  background-color: #F4F4F4;
  border: none;
  outline: none;
  padding: 5px 15px;
  cursor: pointer;
`
