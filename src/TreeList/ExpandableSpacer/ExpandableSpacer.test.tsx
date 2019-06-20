import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { ExpandableSpacer } from './ExpandableSpacer'
import { PARENT, CHILDREN } from '../../utils/makeParentChildTree'

afterEach(cleanup)

describe('<ExpandableSpacer/>', () => {
  test('button is visible if item has children', () => {
    const buttonText = 'test button'
    const button = <button>{buttonText}</button>

    const item1 = { key: '1', value: 'one', level: 1 }
    const item2 = { key: '2', value: 'two', level: 2 }

    item1[CHILDREN] = [item2]
    item2[PARENT] = item1

    const { getByText } = render(<ExpandableSpacer button={button} index={0} data={[item1]}>Test</ExpandableSpacer>)

    const foundButton = getByText(buttonText)

    expect(foundButton.getAttribute('style')).toBe('visibility: visible;')
  })

  test('button is hidden if item has no children', () => {
    const buttonText = 'test button'
    const button = <button>{buttonText}</button>

    const item = { key: '1', value: 'one', level: 1 }

    const { getByText } = render(<ExpandableSpacer button={button} index={0} data={[item]}>Test</ExpandableSpacer>)

    const foundButton = getByText(buttonText)

    expect(foundButton.getAttribute('style')).toBe('visibility: hidden;')
  })
})