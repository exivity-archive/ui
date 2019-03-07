import React from 'react'
import { mount } from 'enzyme'

import { TextArea } from '.'

test('value gets changed after an on change event', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'changed'

  const onChangeMock = jest.fn(x => x)

  const textArea = mount(<TextArea value={initialValue} onChange={onChangeMock} />)

  textArea
    .find('textarea')
    .simulate('change', { target: { value: updatedValue } })

  expect(onChangeMock.mock.results[0].value).toBe(updatedValue)
})
