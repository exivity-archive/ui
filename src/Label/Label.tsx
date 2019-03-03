import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button/Button'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { fromTheme, globalFont } from '../utils/theme'
import { StyledProps } from '../utils/types'

interface LabelProps extends StyledProps {
  secondary?: boolean
}

const secondary = css`
  display: block;
  font-size: ${fromTheme(theme => theme.global.sizes.small)}em;
  color: ${fromTheme(theme => theme.global.textColorMuted)};
`

const Label = styled.label<LabelProps>`
  ${globalFont}

  ${props => props.secondary && secondary}

  & > & {
    ${secondary}
  }
`

Label.defaultProps = defaultStyledProps

export default Label
