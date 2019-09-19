import styled from 'styled-components'

import { Block } from '../Block'
import { fromTheme } from '../utils'

export const Overlay = styled(Block)`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.1);
  position: fixed;
  z-index: ${fromTheme(theme => theme.global.zPriority.foreground)};
`
