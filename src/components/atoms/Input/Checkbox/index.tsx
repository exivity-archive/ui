import * as React from 'react'
<<<<<<< HEAD:src/components/Input/Checkbox/index.tsx
import styled, { css } from 'styled-components'
import { Theme } from '../../../theme';
=======
import styled from 'styled-components'
import { Theme } from '../../../../theme';
>>>>>>> master:src/components/atoms/Input/Checkbox/index.tsx

interface ICheckboxWrapperProps {
  checked: boolean
}

const CheckboxWrapper = styled.div`
  /* background: ${(props: ICheckboxWrapperProps) => props.checked ? '#abd' : 'white'}; */
  background-color: black;
`

export interface ICheckboxProps {
  checked: boolean
  onClick: () => void
  className?: string
  theme: Theme
}

const Checkbox: React.FC<ICheckboxProps> = ({ checked, onClick, className }) => {
  return <CheckboxWrapper checked={checked}>
      <input className={className} type='checkbox' onClick={onClick} defaultChecked={checked} />
      </CheckboxWrapper>
}

Checkbox.defaultProps = {
  checked: false
}


export default styled(Checkbox)`
  margin-top: 1px;
  margin-right: ${props => props.theme.global.margin};
  width:20px;
  height:20px;
  border-radius:5px;
  border:2px solid #555;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`
