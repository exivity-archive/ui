import styled from 'styled-components'
import { SizeProps, space } from 'styled-system'
import { StyledProps } from '../utils/styled'

export type ImageProps =
  & StyledProps
  & SizeProps

export const Image = styled.img<ImageProps>`
  box-sizing: border-box;

  ${space}
`

Image.displayName = 'Image'
