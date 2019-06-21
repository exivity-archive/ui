import React from 'react'
import { render, cleanup } from '@testing-library/react'

import { BranchSpacer } from './BranchSpacer'
import { PARENT, CHILDREN } from '../utils/makeParentChildTree'

afterEach(cleanup)

describe('<ExpandableSpacer/>', () => {
  test('button is rendered when given', () => {
    const buttonText = 'test button'
    const button = <button>{buttonText}</button>

    const item = { key: '1', value: 'one', level: 1 }

    const { queryByText } = render(<BranchSpacer button={button} index={0} data={[item]}>Test</BranchSpacer>)

    const foundButton = queryByText(buttonText)

    expect(foundButton).not.toBe(null)
  })

  test('button is visible if item has children', () => {
    const buttonText = 'test button'
    const button = <button>{buttonText}</button>

    const item1 = { key: '1', value: 'one', level: 1 } as any
    const item2 = { key: '2', value: 'two', level: 2 } as any

    item1[CHILDREN] = [item2]
    item2[PARENT] = item1

    const { getByText } = render(<BranchSpacer button={button} index={0} data={[item1]}>Test</BranchSpacer>)

    const foundButton = getByText(buttonText)

    expect(foundButton.getAttribute('style')).toBe('visibility: visible;')
  })

  test('button is hidden if item has no children', () => {
    const buttonText = 'test button'
    const button = <button>{buttonText}</button>

    const item = { key: '1', value: 'one', level: 1 }

    const { getByText } = render(<BranchSpacer button={button} index={0} data={[item]}>Test</BranchSpacer>)

    const foundButton = getByText(buttonText)

    expect(foundButton.getAttribute('style')).toBe('visibility: hidden;')
  })

})
