import styled from 'styled-components'
import { StyledProps } from '../utils/styled'

export interface ImageProps extends StyledProps {
}

export const Image = styled.img<ImageProps>``

Image.displayName = 'Image'
