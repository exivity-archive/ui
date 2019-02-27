import * as React from 'react'

import { shallow } from 'enzyme'

import TextInput from '.'

test('renders textinput', () => {
  const textInput = shallow(
      <TextInput onChange={() => { return }} />
  )
  expect(textInput).toMatchSnapshot()
})

test('value gets changed after an on change event', () => {
  let value: string = 'hello'
  const event = { target: { value: 'bye' } }
  const mockCallBack = jest.fn((v) => { value = v })

  const textInput = shallow(
      <TextInput value={value} onChange={mockCallBack} />
  )
  textInput.simulate('change', event)
  expect(mockCallBack.mock.calls.length).toEqual(1)
  expect(textInput.props().value === 'bye')
  expect(value === 'bye')
})
