import React from 'react'

import { Flex } from '../Flex'
import { makeRows } from './helpers'
import { getWidget } from './Column'
import { useBreakpoints } from '../useBreakpoints'
import { useStyledTheme } from '../utils/styled'

export const AutoLayout = ({ children, wrapInWidgets, height, spacing, ...blockProps }: any) => {
  const activeSpacing = useSpacing(spacing)
  const { space } = useStyledTheme()
  const heightOffset = space[activeSpacing]

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

function wrapInWidget (rows: any, wrapInWidgets: boolean) {
  return rows.map((row: any) => {
    return row.map((column: any, index: number) => {
      const props = {
        key: index,
        grow: column.props.width ? undefined : 1,
        height: '100%',
        ...column.props
      }

      if (wrapInWidgets) return getWidget(props)

      return React.cloneElement(column, props)
    })
  })
}

function applySpacing (rows: any, heightOffSet: string, spacing: number | undefined) {
  if (!spacing) return rows

  return rows.map((row: any) => {
    return row.map((column: any, columnsIndex: number) => {
      return React.cloneElement(column, {
        ml: columnsIndex === 0 ? spacing : undefined,
        mt: spacing,
        mr: spacing,
        ...column.props,
        height: getHeight(column.props.height, heightOffSet, spacing)
      })
    })
  })
}

function getHeight (height: string | number | undefined, heightOffset: string, spacing?: number | undefined) {
  if (!height && !spacing) return '100%'

  if (!height && spacing) return `calc(100% - ${heightOffset})`

  if (height && spacing) {
    return typeof height === 'string'
      ? `calc(${height} - ${heightOffset})`
      : `calc(${height}px - ${heightOffset})`
  }

  return height
}

function useSpacing (spacing: number | number[]) {
  const breakPoint = useBreakpoints()

  if (Array.isArray(spacing) && breakPoint <= (spacing.length - 1)) {
    return spacing[breakPoint]
  }

  if (Array.isArray(spacing)) {
    return spacing[spacing.length - 1]
  }

  return spacing
}
