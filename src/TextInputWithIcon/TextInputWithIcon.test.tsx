import * as React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { MdVerifiedUser } from 'react-icons/md'

import { TextInputWithIcon } from '.'

test('TextInputWithIcon snapshot', () => {
  const textInputWithIcon = renderer.create(
    <TextInputWithIcon value='TextInputWIthIcon' icon={<MdVerifiedUser/>} onChange={jest.fn()} />
  )

  expect(textInputWithIcon).toMatchSnapshot()
})

test('TextInputWithIcon iconLeft snapshot', () => {
  const textInputWithIcon = renderer.create(
    <TextInputWithIcon iconLeft value='TextInputWIthIcon' icon={<MdVerifiedUser/>} onChange={jest.fn()} />
  )

  expect(textInputWithIcon).toMatchSnapshot()
})

test('value gets changed after an on change event', () => {
  const initialValue = 'initialValue'
  const updatedValue = 'changed'

  const onChangeMock = jest.fn(x => x)

  const textInputWithIcon = mount(<TextInputWithIcon icon={<MdVerifiedUser/>} value={initialValue} onChange={onChangeMock} />)

  textInputWithIcon
    .find('input')
    .simulate('change', { target: { value: updatedValue } })

  expect(onChangeMock.mock.results[0].value).toBe(updatedValue)
})
