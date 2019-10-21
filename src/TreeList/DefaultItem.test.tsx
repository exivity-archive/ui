import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import { CHILDREN } from '../utils/makeParentChildTree'

import { DefaultItem } from './DefaultItem'

describe('the DefaultItem component', () => {
  test('returns an item onChange', () => {
    const item = {
      key: '1',
      value: 'one',
      parentId: null,
      level: 1,
      expand: jest.fn(),
      expanded: false
    }

    const onChange = jest.fn(item => item)

    const { getByTestId, unmount } = render(<DefaultItem data={{ items: [item], onChange }} style={{}} index={0} />)

    act(() => {
      fireEvent.click(getByTestId('treelist-item'))
    })

    const onChangeResult = onChange.mock.results[0].value

    expect(onChangeResult).toMatchObject(item)

    unmount()
  })

  test('shows ToggleExpandedButton when item has children', () => {
    const item = {
      key: '1',
      value: 'one',
      parentId: null,
      [CHILDREN]: ['fake'] as any,
      level: 1,
      expand: jest.fn(),
      expanded: false
    }

    const { getByTestId, unmount } = render(<DefaultItem data={{ items: [item], onChange: jest.fn() }} index={0} style={{}} />)

    expect(getByTestId('treelist-item-toggle-expand-button')).toBeInTheDocument()

    unmount()
  })

  test('shows expand icon when item is collapsed', () => {
    const item = {
      key: '1',
      value: 'one',
      parentId: null,
      [CHILDREN]: ['fake'] as any,
      level: 1,
      expand: jest.fn(),
      expanded: false
    }

    const { getByTestId, unmount } = render(<DefaultItem data={{ items: [item], onChange: jest.fn() }} index={0} style={{}} />)

    expect(getByTestId('treelist-item-toggle-expand-button-expand-icon')).toBeInTheDocument()

    unmount()
  })

  test('shows collapse icon when item is expanded', () => {
    const item = {
      key: '1',
      value: 'one',
      parentId: null,
      [CHILDREN]: ['fake'] as any,
      level: 1,
      expand: jest.fn(),
      expanded: true
    }

    const { getByTestId, unmount } = render(<DefaultItem data={{ items: [item], onChange: jest.fn() }} index={0} style={{}} />)

    expect(getByTestId('treelist-item-toggle-expand-button-collapse-icon')).toBeInTheDocument()

    unmount()
  })
})
