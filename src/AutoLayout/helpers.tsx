import React from 'react'

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
