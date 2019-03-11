import React from 'react'
import styled, { css } from 'styled-components'

export const Row = styled.div<{ columns?: number | false, columnWidth?: number }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${(props: any) => props.columns || 10},
      fit-content(${(props: any) => props.columnWidth || 200}px));
  `}
`
