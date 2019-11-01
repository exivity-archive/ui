import styled from 'styled-components'
import { fontSize, FontSizeProps, textColor, TextColorProps } from 'styled-system'

import { globalFont, StyledProps } from '../utils/styled'

export type TextProps =
  & StyledProps
  & TextColorProps
  & FontSizeProps

export const Text = styled.span<TextProps>`
  ${globalFont}
  ${textColor}
  ${fontSize}
`

Text.displayName = 'Text'
