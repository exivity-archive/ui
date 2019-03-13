import styled from 'styled-components'
import { BlockProps, defaultStyledProps, globalBlockSpacing, globalFont, StyledProps } from '../utils/styled'

export const Paragraph = styled.p<StyledProps & BlockProps>`
  ${globalFont};
  ${globalBlockSpacing};
`

Paragraph.defaultProps = {
  ...defaultStyledProps
}
