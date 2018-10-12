import color from 'color'
import { css } from 'styled-components'

const base = css`${({ theme }) => `
@import url('${theme.fonts.url}');

html {
  line-height: ${theme.lineHeight};
}
 
body {
  background-color: ${theme.colours.bg};
  color: ${theme.colours.text};
  
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
  border-bottom: 2px solid ${color(theme.colours.primary).lighten(1.1).string()};
}

&:focus {
  --focus-color: ${color(theme.colours.primary).lighten(1.1).string()};
  outline: none;
  background-color: var(--focus-color);
  box-shadow: 0 0 0 4px var(--focus-color);
}
`}`

export default base
