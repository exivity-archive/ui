import React from 'react'
import { makeRows, getHeight } from './helpers'
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

describe('getHeight', () => {
  test('no height and no spacing', () => {
    const height = undefined
    const heightOffset = '0px'
    const spacing = undefined

    expect(getHeight(height, heightOffset, spacing)).toBe('100%')
  })

  test('no height and spacing', () => {
    const height = undefined
    const heightOffset = '16em'
    const spacing = 1

    expect(getHeight(height, heightOffset, spacing)).toBe('calc(100% - 16em)')
  })

  test('height as number and spacing', () => {
    const height = 400
    const heightOffset = '16em'
    const spacing = 1

    expect(getHeight(height, heightOffset, spacing)).toBe('calc(400px - 16em)')
  })

  test('height as string and spacing', () => {
    const height = '80%'
    const heightOffset = '16em'
    const spacing = 1

    expect(getHeight(height, heightOffset, spacing)).toBe('calc(80% - 16em)')
  })

  test('height and no spacing', () => {
    const height = '80%'
    const heightOffset = '0px'
    const spacing = undefined

    expect(getHeight(height, heightOffset, spacing)).toBe(height)
  })
})
