import React, { cloneElement, useContext, createContext, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { getHighestHeight } from './helpers'

import { Flex } from '../Flex'
import { Block, BlockProps } from '../Block'
import { Widget } from '../Widget'

const DEFAULT_PADDING = 1

const DEFAULT_CONTEXT = {
  providerActive: false,
  p: DEFAULT_PADDING
}

const AutoLayoutContext = createContext(DEFAULT_CONTEXT)

function makeRows (children: any, shouldWrap: boolean = false, height?: string | number) {
  const rows: any[] = []
  let rowCount = 0

  React.Children.forEach(children, (child, index) => {
    if (!index && child) {
      const newRow = [child]
      rows.push(newRow)
    }

    if (child && child.props.newRow) {
      rowCount = +1
      const newRow = [child]
      rows.push(newRow)
    } else if (child && index) {
      rows[rowCount].push(child)
    }
  })

  return rows.map(row => {
    row.containerHeight = typeof height === 'number'
      ? undefined
      : `${100 / rows.length}%`
    row.shouldWrap = shouldWrap
    return row
  })
}

const wrapInWidget = (column, shouldWrap: boolean) => {
  if (!shouldWrap) return column
  if (column.type.displayName === 'AutoLayout') {
    return cloneElement(column , {
      p: 0,
      ...column.props
    })
  }

  return (
    <Column height={column.props.height || column.props.minHeight || '100%'} {...column.props}>
      <Widget height={column.props.height || column.props.minHeight || '100%'}>
        {column.props.children}
      </Widget>
    </Column>
  )
}

const renderRow = (row, index: number) => {
  const firstRow = index === 0
  const highest = getHighestHeight(row)
  const height = row.containerHeight ? row.containerHeight : highest

  return (
    <AutoLayoutContext.Consumer>
      {({ p }) => (
        <Flex id='row-flex' key={index} pt={firstRow ? undefined : p} height={height}>
          {row.map(renderColumn)}
        </Flex>
      )}
    </AutoLayoutContext.Consumer>
  )
}

const renderColumn = (column, index: number, row: any[]) => {
  console.log('test', column.props.width)
  return (
    <AutoLayoutContext.Consumer>
      {({ p }) => (
          <Flex.Item id='column-flexitem' key={index} width={column.props.width}
                     grow={column.props.grow}
                     pl={index !== 0 ? p : 0}>
            {wrapInWidget(column, row.shouldWrap)}
          </Flex.Item>
        )}
    </AutoLayoutContext.Consumer>
  )
}

const BorderBoxBlock = styled(Block)`
  box-sizing: border-box;

  ${({ sticky, stickyOffset = 10 }: any) => sticky && css`
    position: sticky;
    top: ${stickyOffset}px;
    `}
`

interface AutoLayoutProps extends BlockProps {
  wrapInWidgets?: boolean
  height?: number | string
  sticky?: boolean
  stickyOffset?: number
  widgetComponent?: any
  children: any
}

export const AutoLayout: React.FC<AutoLayoutProps> = ({ children, wrapInWidgets, height, ...blockProps }) => {
  const { providerActive } = useContext(AutoLayoutContext)
  const rows = makeRows(children, wrapInWidgets, height)
  const val = useMemo(() => {
    return { providerActive: true, ...blockProps }
  },[blockProps, wrapInWidgets])

  const child = (
    <BorderBoxBlock id='borderbox' p={DEFAULT_PADDING} height={height} {...blockProps}>
      {rows.map(renderRow)}
    </BorderBoxBlock>
  )

  if (providerActive) return child

  return (
    <AutoLayoutContext.Provider value={val}>
      {child}
    </AutoLayoutContext.Provider>
  )
}

AutoLayout.displayName = 'AutoLayout'

export const Column = styled<{ newRow: boolean, sticky: boolean }>(Block)`
  ${({ sticky, stickyOffset = 10 }: any) => sticky && css`
    position: sticky;
    top: ${stickyOffset}px;
  `}
`
