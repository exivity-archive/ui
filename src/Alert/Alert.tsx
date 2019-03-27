import styled from 'styled-components'
import { fromTheme, globalFont, matchThemeProp, PurposesProps, StyledProps } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

export type AlertProps =
  & PurposesProps
  & StyledProps

export const Alert = styled.div<AlertProps>`
  ${globalFont};

  background-color: ${matchThemeProp(theme => theme.global.purposes)};
  color: ${fromTheme(theme => theme.colors.white)};
  padding: ${preciseEm(0.5)}em ${preciseEm(1)}em;
  border: none;
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;
`

Alert.displayName = 'Alert'
