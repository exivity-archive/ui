import * as React from 'react'

import renderer from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TextInput from '.'

configure({ adapter: new Adapter() })

test('renders checkbox', () => {
  const textInput = renderer.create(
      <TextInput onChange={() => { return }} />
  )
  expect(textInput.toJSON()).toMatchSnapshot()
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
