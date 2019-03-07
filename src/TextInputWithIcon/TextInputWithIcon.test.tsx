import * as React from 'react'
import { mount } from 'enzyme'
import { MdVerifiedUser } from 'react-icons/md'

import { TextInputWithIcon } from '.'

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
