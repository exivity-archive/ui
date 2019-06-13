import React from 'react'

import { Flex } from '../Flex'
import { makeRows, useSpacing, applySpacing, getHeight, wrapInWidget } from './helpers'
import { useStyledTheme } from '../utils/styled'
import { BlockProps } from '../Block'

export interface AutoLayoutProps {
  height?: string | number
  spacing?: number | number[]
  wrapInWidgets?: boolean
  children: any
}

export const AutoLayout = ({ children, wrapInWidgets, height, spacing, ...blockProps }: AutoLayoutProps & BlockProps) => {
  const activeSpacing = useSpacing(spacing)
  const { space } = useStyledTheme()
  const heightOffset = activeSpacing ? space[activeSpacing] : '0px'

  const rows = applySpacing(wrapInWidget(makeRows(children), wrapInWidgets), heightOffset, activeSpacing)

  return (
    <Flex wrap='wrap' pb={activeSpacing} height={getHeight(height, heightOffset, activeSpacing)} {...blockProps}>
      {rows.map((row: any, index: number) => (
        <Flex.Item grow={1} width='100%' key={index}>
          <Flex wrap='wrap' height='100%' width='100%'>
            {row}
          </Flex>
        </Flex.Item>
      ))}
    </Flex>
  )
}
