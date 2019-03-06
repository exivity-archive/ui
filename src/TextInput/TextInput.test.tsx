import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import * as React from 'react'

import { TextInput } from '.'

test('TextInput snapshot', () => {
  const textInput = renderer.create(<TextInput onChange={jest.fn()} />)
  expect(textInput).toMatchSnapshot()
})

test('value gets changed after an on change event', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'changed'

  const onChangeMock = jest.fn(x => x)

  const textInput = mount(<TextInput value={initialValue} onChange={onChangeMock} />)

  textInput
    .find('input')
    .simulate('change', { target: { value: updatedValue } })

  expect(onChangeMock.mock.results[0].value).toBe(updatedValue)
})
