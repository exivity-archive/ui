import styled from 'styled-components'
import { globalFont, StyledProps } from '../utils/styled'

export interface RadioProps extends StyledProps {
  someFlag?: boolean
}

export const Radio = styled.div<RadioProps>`
  ${globalFont};

  color: ${props => props.someFlag ? 'red' : 'green'};
`

Radio.displayName = 'Radio'
