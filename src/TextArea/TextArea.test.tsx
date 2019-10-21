import React from 'react'

import { mountWithTheme } from '../utils/tests/mountWithTheme'

import { TextArea } from '.'

test('value gets changed after an on change event', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'changed'

  const onChangeMock = jest.fn(x => x)

  const textArea = mountWithTheme(<TextArea value={initialValue} onChange={onChangeMock} />)

  textArea
    .find('textarea')
    .simulate('change', { target: { value: updatedValue } })

  expect(onChangeMock.mock.results[0].value).toBe(updatedValue)
})
