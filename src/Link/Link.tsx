import styled from 'styled-components'

import { fromTheme, globalFont, toRgbString } from '../utils/styled'

export const Link = styled.a`
  ${globalFont};

  display: inline-grid;
  grid-gap: 0.25em;
  align-items: center;
  grid-auto-flow: column;
  text-decoration: none;

  color: ${fromTheme(theme => theme.global.purposes.primary)};
  --focus-color: ${fromTheme(theme => toRgbString(theme.global.purposes.primary))};

  &:focus {
    outline: none;
    border-radius: 1px;
    background-color: rgba(var(--focus-color), 0.3);
    box-shadow: 0 0 0 ${fromTheme(theme => theme.global.outlineWidth)}px rgba(var(--focus-color), 0.3);
  }

  &:hover {
    text-decoration: underline;
  }
`
