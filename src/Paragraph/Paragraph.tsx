import styled from 'styled-components'
import { defaultStyledProps, globalFont, StyledProps } from '../utils/styled'

export const Paragraph = styled.p<StyledProps>`
  ${globalFont};

  margin-top: 0;

  &:last-child {
    margin-bottom: 0;
  }
`

Paragraph.defaultProps = {
  ...defaultStyledProps
}
