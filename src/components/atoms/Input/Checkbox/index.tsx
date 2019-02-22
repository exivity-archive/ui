import * as React from 'react'

import styled, { css } from 'styled-components'
import { Theme } from '../../../../theme';

interface ICheckboxWrapperProps {
  checked: boolean
}

const CheckboxWrapper = styled.div`
    position: absolute;
    display: inline-block;
    margin: 20px;
    width: 100px;
    height: 100px;
    overflow: hidden;

    ${(props: ICheckboxWrapperProps) => props.checked && css`&:after {
      position: relative;
      left: 5px;
      top: -30px;
      transform: rotateZ(45deg);
      border: solid #fff;
      border-width: 0 3px 3px 0;
      content: ' ';
      display: block;
      width: 6px;
      height: 12px;
    }
    `}
  
`

export interface ICheckboxProps {
  checked: boolean
  onClick: () => void
  onChange: (value: boolean) => void
  className?: string
  theme: Theme
}

const Checkbox: React.FC<ICheckboxProps> = ({ checked, onClick, className, onChange }) => {
  return <CheckboxWrapper checked={checked}>
      <input 
        className={className} 
        type='checkbox' 
        onClick={onClick} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)} 
        defaultChecked={checked} />
      </CheckboxWrapper>
}

Checkbox.defaultProps = {
  checked: false
}


export default styled(Checkbox)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: ${props => props.checked ? 'rgba(40,40,40,0.7)' : 'rgba(40,40,40,0.2)'};
  color:black;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  position: relative;
  left: -5px;
  top: -5px;

  :focus {
    outline:0;
  }
`
