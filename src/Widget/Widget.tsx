import React from 'react'
import styled from 'styled-components'

import { fromTheme, hexToString } from '../utils/styled'
import { Block, BlockProps } from '../Block'

const StyledWidget = styled(Block)<BlockProps>`
  background: white;
  box-shadow: 1px 1px 0 rgba(${fromTheme(theme => hexToString(theme.global.purposes.primary))},0.4);
  box-sizing: border-box;
`

export const Widget = (props: BlockProps) => (
  <StyledWidget borderRadius={3} p={2} {...props}/>
)
