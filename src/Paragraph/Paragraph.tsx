import styled from 'styled-components'
import { defaultStyledProps, globalFont, StyledProps } from '../utils/styled'

export const Paragraph = styled.p<StyledProps>`
  ${globalFont};
`

Paragraph.defaultProps = {
  ...defaultStyledProps
}
