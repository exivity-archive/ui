import * as React from 'react'

import styled, { css } from 'styled-components'

interface ICheckboxWrapperProps {
  checked: boolean
}

const CheckboxWrapper = styled.div`
    margin: 20px;
    width: 100px;
    height: 100px;
    overflow: hidden;

    ${(props: ICheckboxWrapperProps) => props.checked && css`
        &:after {
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
          cursor: pointer;
        }
    `}
`

export interface ICheckboxProps {
  checked: boolean
  onClick?: (value: boolean) => void
  onChange?: (value: boolean) => void
  className?: string
}

export const PlainCheckbox: React.FC<ICheckboxProps> = ({ checked, onClick, className, onChange, ...props }) => {
  return (
    <CheckboxWrapper checked={checked}>
      <input
        className={className}
        type='checkbox'
        onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          const checked = (e.target as HTMLInputElement).checked
          onClick && onClick(checked)
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange && onChange(e.target.checked)
        }}
        checked={checked}
        {...props}
      />
    </CheckboxWrapper>
  )
}

export const Checkbox = styled(PlainCheckbox)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: ${props => props.checked ? 'rgba(40,40,40,0.7)' : 'rgba(40,40,40,0.2)'};
  color: black;
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
