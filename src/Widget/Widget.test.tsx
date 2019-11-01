import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { Widget } from './Widget'

afterEach(cleanup)

describe('<Widget/>', () => {
  test('It renders without errors', () => {
    render(<Widget><div /></Widget>)
  })

  test('displayName is Widget', () => {
    expect(Widget.displayName).toBe('Widget')
  })

  test('sticky prop should set position to sticky', () => {
    const { getByText } = render(<Widget sticky>Test</Widget>)
    const widget = getByText('Test')

    expect(widget).toHaveStyleRule('position', 'sticky')
  })

  test('stickyOffset defaults to 0', () => {
    const { getByText } = render(<Widget sticky>Test</Widget>)
    const widget = getByText('Test')

    expect(widget).toHaveStyleRule('top', '0px')
  })

  test('stickyOffset prop sets the top property if sticky prop is true', () => {
    const { getByText } = render(<Widget stickyOffset={10} sticky>Test</Widget>)
    const widget = getByText('Test')

    expect(widget).toHaveStyleRule('top', '10px')
  })

  test('stickyOffset gets ignored if sicky is false', () => {
    const { getByText } = render(<Widget stickyOffset={10}>Test</Widget>)
    const widget = getByText('Test')

    expect(widget).not.toHaveStyleRule('top', '10px')
  })
})
