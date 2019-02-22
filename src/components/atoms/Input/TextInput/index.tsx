import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  value?: string
  onChange: (value: string) => void
  className?: string
}

const TextInput: React.FC<IProps> = ({ value, onChange, className }) => (
  <input 
    type='text'
    value={value} 
    onChange={(event) => onChange(event.target.value)} 
    className={className}
  />
)

TextInput.defaultProps = {
  value: ''
}

export default styled(TextInput)`
  font-family: ${props => props.theme.primaryFont};
  color: #444444;
  height: 30px;
  width: 300px;
  background-color: #F4F4F4;
  border: none;
  outline: none;
  padding: 0 15px;
`