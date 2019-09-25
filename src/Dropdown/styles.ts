import styled from 'styled-components'
import { Block } from '../Block'
import { fromTheme } from '../utils'

export const Content = styled(Block)<{ fullWidth?: boolean }>`
  background-color: ${fromTheme(t => t.colors.white)};
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  min-width: ${({ fullWidth }) => fullWidth ? '100%' : '160px'};
  z-index: ${fromTheme(theme => theme.global.zPriority.foreground)};
`
