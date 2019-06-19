import React from 'react'
import { Input } from '.'

// Modify or remove, stories are snapshotted automatically
import { mountWithTheme } from '../utils/tests/mountWithTheme'

test('value gets changed after an on change event', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'changed'

  const onChangeMock = jest.fn(x => x)

  const wrapper = mountWithTheme(
    <Input value={initialValue} onChange={onChangeMock} />
  )

  wrapper
    .find('input')
    .simulate('change', { target: { value: updatedValue } })

  expect(onChangeMock.mock.results[0].value).toBe(updatedValue)
})
