import styled from 'styled-components'
import { defaultStyledProps, globalSectionSpacing, SectionProps } from '../utils/styled'
import { Text, TextProps } from '../Text'

export const Paragraph = styled(Text).attrs({
  as: 'p'
})<TextProps & SectionProps>`
  ${globalSectionSpacing}
`

Paragraph.defaultProps = {
  ...defaultStyledProps
}
