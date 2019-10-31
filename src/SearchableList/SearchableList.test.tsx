import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { SearchableList } from './SearchableList'

const ONE = 'list one'
const TWO = 'list two'

test('Click triggers onChange', () => {
  const mock = jest.fn()

  const data = [
    { key: ONE, value: ONE },
    { key: TWO, value: TWO }
  ]

  const { getByText, unmount } = render(
    <SearchableList placeholder='search' data={data} onChange={mock} />
  )

  fireEvent.click(getByText(ONE))

  expect(mock).toHaveBeenCalled()

  unmount()
})

test('SearchTerm will filter list', () => {
  const mock = jest.fn()

  const data = [
    { key: ONE, value: ONE },
    { key: TWO, value: TWO }
  ]

  const { getAllByText, getByPlaceholderText, unmount } = render(
    <SearchableList placeholder='search' data={data} onChange={mock} />
  )

  const searchInput = getByPlaceholderText('SEARCH')
  fireEvent.change(searchInput, { target: { value: 'on' } })

  const listItems = getAllByText((content) => content.startsWith('list'))

  expect(listItems).toHaveLength(1)

  unmount()
})
