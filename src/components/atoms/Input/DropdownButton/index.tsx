import * as React from 'react'

import Icon from "../../Icon";
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md'

interface IDropdownButtonProps {
  value: string
  className?: string
}

const DropdownButton: React.FC<IDropdownButtonProps> = ({ value, className }) => (
  <button className={className}>
    {value}
    <Icon><MdKeyboardArrowDown/></Icon>
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
  padding: 0 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`