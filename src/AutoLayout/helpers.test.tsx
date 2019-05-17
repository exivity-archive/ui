import React from 'react'
import { makeRows } from './helpers'
import { Column } from './Column'

test('makeRows', () => {
  const children = [
    <Column />,
    <Column />,
    <Column newRow/>,
    <Column />,
    <Column newRow/>,
    <Column />
  ]

  const rows = makeRows(children)
  expect(rows).toHaveLength(3)
  rows.forEach((row) => {
    expect(row).toHaveLength(2)
  })
})
