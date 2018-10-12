import { css } from 'styled-components'

import theme from '../theme'

const base = css`
  @import url('${theme.type.fonts.url}');
  
  html {
    line-height: ${theme.type.lineHeight};
  }
   
  body {  
    font-size: ${theme.type.size}px;
    font-family: ${theme.type.fonts.base.family};
    font-weight: ${theme.type.fonts.base.weight};
  }
  
  h1, h2, h3, strong {
    font-weight: ${theme.type.fonts.base.weight};
  }
  
  &:focus {
    --focus-color: ${theme.palette.primary[4]};
    outline: none;
    background-color: var(--focus-color);
    box-shadow: 0 0 0 4px var(--focus-color);
    border-radius: 1px;
  }
`

export default base
