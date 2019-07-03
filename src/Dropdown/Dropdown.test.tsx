import * as React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'

import { Dropdown } from '.'

test('passing open prop as false should hide dropdown content', () => {
  const dropdown = mount(<Dropdown open={false} triggerComponent={<div>test</div>}>test</Dropdown>)

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })

  expect(dropdownContent).toHaveStyleRule('display', 'none')
  dropdown.unmount()
})
