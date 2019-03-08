import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme, globalFont, StyledProps } from '../utils/styled'

interface LabelProps extends StyledProps {
  secondary?: boolean
}

const secondary = css`
  display: block;
  font-size: ${fromTheme(theme => theme.global.sizes.small)}em;
  color: ${fromTheme(theme => theme.global.textColorMuted)};
`

export const Label = styled.label<LabelProps>`
  ${globalFont}

  ${props => props.secondary && secondary}

  & > & {
    ${secondary}
  }
`
