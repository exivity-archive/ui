import React from 'react'
import styled, { css } from 'styled-components'
import { fromTheme, toRgbString } from '../utils/styled'
import { Block, BlockProps } from '../Block'

interface WidgetProps {
  sticky?: boolean
}

const StyledWidget = styled(Block) <WidgetProps>`
  background: white;
  box-shadow: 1px 1px 0 rgba(${fromTheme(theme => toRgbString(theme.global.purposes.primary))},0.4);
  box-sizing: border-box;

  ${props => props.sticky && css`
    position: sticky;
  `}
`

export const Widget = (props: BlockProps & { children: any }) => (
  <StyledWidget borderRadius={3} p={2} {...props} />
)

Widget.displayName = 'Widget'
