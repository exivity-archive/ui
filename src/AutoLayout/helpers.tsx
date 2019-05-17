import React from 'react'
import { getWidget } from './Column'
import { useBreakpoints } from '../useBreakpoints'

export function makeRows (children: any) {
  const rows: any[] = []
  let rowCount = 0

  React.Children.forEach(children, (child, index) => {
    if (!index && child) {
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

export function getHeight (height: string | number | undefined, heightOffset: string, spacing?: number | undefined) {
  if (!height && !spacing) return '100%'

  if (!height && spacing) return `calc(100% - ${heightOffset})`

  if (height && spacing) {
    return typeof height === 'string'
      ? `calc(${height} - ${heightOffset})`
      : `calc(${height}px - ${heightOffset})`
  }

  return height
}

export function useSpacing (spacing?: number | number[]) {
  const breakPoint = useBreakpoints()

  if (Array.isArray(spacing) && breakPoint <= (spacing.length - 1)) {
    return spacing[breakPoint]
  }

  if (Array.isArray(spacing)) {
    return spacing[spacing.length - 1]
  }

  return spacing
}
