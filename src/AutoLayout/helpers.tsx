import React from 'react'
import { getWidget } from './Column'
import { useBreakpointIndex } from '../useBreakpoints'

export function makeRows (children: any) {
  const rows: any[] = []
  let rowCount = 0

  React.Children.forEach(children, (child, index) => {
    if (index === 0 && child) {
      const newRow = [child]
      rows.push(newRow)
    }

    if (child && child.props.newRow) {
      rowCount += 1
      const newRow = [child]
      rows.push(newRow)
    } else if (child && index) {
      rows[rowCount].push(child)
    }
  })

  return rows
}

export function wrapInWidget (rows: any, wrapInWidgets?: boolean) {
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

export function applySpacing (rows: any, heightOffSet: string, spacing: number | undefined) {
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

function formatHeight (height: number | string) {
  return typeof height === 'string'
    ? height
    : `${height}px`
}

export function getHeight (height: string | number | undefined, heightOffset: string, spacing?: number | undefined) {
  if (!height && !spacing) return '100%'

  if (!height && spacing) return `calc(100% - ${heightOffset})`

  if (height && spacing) {
    const formattedHeight = formatHeight(height)

    return `calc(${formattedHeight} - ${heightOffset})`
  }

  return height
}

export function useSpacing (spacing?: number | number[]) {
  const breakPointIndex = useBreakpointIndex()

  if (Array.isArray(spacing) && breakPointIndex <= (spacing.length - 1)) {
    return spacing[breakPointIndex]
  }

  if (Array.isArray(spacing)) {
    return spacing[spacing.length - 1]
  }

  return spacing
}
