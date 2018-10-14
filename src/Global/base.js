import { css } from 'reakit'
import color from 'color'

import theme from '../theme'

const base = css`
  body {
    --focus-color: red;
  }
  
  &:focus {
    outline: none;
    background-color: rgba(var(--focus-color), 0.5);
    box-shadow: 0 0 0 4px rgba(var(--focus-color), 0.5);
    border-radius: 1px;
  }
`

export default base
