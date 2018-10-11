import { css } from 'styled-components'

const base = css`${({ theme }) => `
@import url('${theme.fonts.url}');

html {
  line-height: ${theme.lineHeight};
}
 
body {
  background-color: ${theme.colours.lightest};
  color: ${theme.colours.dark};
  
  font-size: ${theme.size}px;
  font-family: ${theme.fonts.base.family};
  font-weight: ${theme.fonts.base.weight};
}

h1, h2, h3, strong {
  font-weight: ${theme.fonts.base.weight};
}

a {
  color: ${theme.colours.primary};
  text-decoration: none;
  border-bottom: 2px solid ${theme.colours.primaryLighter}; 
}
`}`

export default base
