import styled from 'styled-components'
import { fromTheme, globalFont, matchThemeProp, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

export interface AlertProps extends StyledProps {
  // Purposes
  primary?: boolean
  secondary?: boolean
  success?: boolean
  danger?: boolean
}

export const Alert = styled.div.attrs({
  as: 'div',
  color: 'white'
})<AlertProps>`
  ${globalFont};

  background-color: ${matchThemeProp(theme => theme.global.purposes)};
  color: ${fromTheme(theme => theme.colors.white)};
  padding: ${preciseEm(0.5)}em ${preciseEm(1)}em;
  border: none;
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
`

Alert.displayName = 'Alert'
