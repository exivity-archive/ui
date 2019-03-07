import * as React from 'react'
import { mount } from 'enzyme'

import { SelectInput } from '.'

test('value gets changed after an on change event', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'changed'

  const onChangeMock = jest.fn(x => x)

  const selectInput = mount(<SelectInput value={initialValue} onChange={onChangeMock} />)

  selectInput
    .find('input')
    .simulate('change', { target: { value: updatedValue } })

  expect(onChangeMock.mock.results[0].value).toBe(updatedValue)
})
