import * as React from 'react'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'

import Dropdown from '.'

//  @todo test position
test('renders dropdown', () => {
  const checkbox = shallow(<Dropdown open button={<div>test</div>}>test</Dropdown>)
  expect(checkbox).toMatchSnapshot()
})

test('passing checked prop as true should show dropdown content', () => {
  const dropdown = mount(<Dropdown open button={<div>test</div>}>test</Dropdown>)

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })

  expect(dropdownContent).toHaveStyleRule('visibility', 'visible')
  dropdown.unmount()
})

test('passing checked prop as false should hide dropdown content', () => {
  const dropdown = mount(<Dropdown open={false} button={<div>test</div>}>test</Dropdown>)

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })

  expect(dropdownContent).toHaveStyleRule('visibility', 'hidden')
  dropdown.unmount()
})
