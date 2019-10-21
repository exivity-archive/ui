import { HTMLProps } from 'react'
import styled, { css } from 'styled-components'
import { height, HeightProps, size, SizeProps, space, SpaceProps, width, WidthProps } from 'styled-system'

import { StyledProps } from '../utils/styled'

export type ImageProps =
  {
    background?: 'contain' | 'cover'
    position?: 'center' | string
    repeat?: boolean
  }
  & StyledProps
  & SpaceProps
  & SizeProps
  & WidthProps
  & HeightProps

export const Image = styled.img.attrs((props: ImageProps) => ({
  as: props.background ? 'div' : 'img'
}))<ImageProps>`
  box-sizing: border-box;
  ${props => props.background && css`
    background-image: url('${props.src}');
    background-size: ${props.background};
    background-position: ${props.position && props.position !== 'center' ? props.position : '50% 50%'};
    background-repeat: ${props.repeat ? 'repeat' : 'no-repeat'};
  `}

  ${space}
  ${size}
  ${width}
  ${height}
`

Image.displayName = 'Image'
