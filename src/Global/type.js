import { css } from 'reakit'

import theme from '../theme'

const type = css`
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
`

export default type
