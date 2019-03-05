import React from 'react'
import styled, { css } from 'styled-components'
import defaultStyledProps from '../utils/testing/defaultStyledProps'
import { globalFont, StyledProps } from '../utils/theme'

interface LabelProps extends StyledProps {
  secondary?: boolean
}

const secondary = css`
  display: block;
  font-size: ${props => props.theme.global.sizes.small}em;
  color: ${props => props.theme.global.textColorMuted};
`

const Label = styled.label <LabelProps>`
  ${globalFont}

  ${props => props.secondary && secondary}

  & > & {
    ${secondary}
  }
`

Label.defaultProps = defaultStyledProps

export default Label
