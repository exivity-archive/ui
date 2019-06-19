import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme, toRgbString } from '../utils/styled'
import { Block, BlockProps } from '../Block'

interface WidgetProps {
  sticky?: boolean
  stickyOffset?: number
  children: any
}

const StyledWidget = styled(Block) <WidgetProps>`
  background: white;
  box-shadow: 1px 1px 0 rgba(${fromTheme(theme => toRgbString(theme.global.purposes.primary))},0.4);
  box-sizing: border-box;

  ${({ sticky, stickyOffset = 0 }) => sticky && css`
    top: ${stickyOffset}px;
    position: sticky;
  `}
`

export const Widget = (props: BlockProps & WidgetProps) => (
  <StyledWidget borderRadius={3} p={2} {...props} />
)

Widget.displayName = 'Widget'
