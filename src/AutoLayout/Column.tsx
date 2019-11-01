import React from 'react'
import styled, { css } from 'styled-components'

import { Widget } from '../Widget'
import { Flex, FlexProps } from '../Flex'

export interface ColumnProps extends FlexProps {
  height?: string | number
  newRow?: boolean
  sticky?: boolean
  stickyOffset?: number
}

export const Column = styled(Flex.Item)<ColumnProps>`
${({ sticky, stickyOffset = 0 }) => sticky && css`
    position: sticky;
    top: ${stickyOffset}px;
  `}
`

const WidgetColumn = (props: ColumnProps) => <Column as={Widget} {...props} />
WidgetColumn.displayName = 'Widget'

export const getWidget = (props: ColumnProps) => <WidgetColumn {...props} />
