import React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'

import { Dropdown } from '.'

describe('The Dropdown component', () => {
  test('hides content, when open is false', () => {
    const wrapper = mount((
      <Dropdown open={false} trigger={<button>toggle</button>}>
        <div>test</div>
      </Dropdown>
    ))

    const dropdownContent = wrapper.find(Dropdown.Content)

    expect(dropdownContent).toHaveLength(0)

    wrapper.unmount()
  })

  test('displays content, when open is true', () => {
    const wrapper = mount((
      <Dropdown open trigger={<button>toggle</button>}>
        <div>test</div>
      </Dropdown>
    ))

    const dropdownContent = wrapper.find(Dropdown.Content)

    expect(dropdownContent).toHaveLength(1)

    wrapper.unmount()
  })

  test('uses min. width, when useTriggerWidth is false', () => {
    const wrapper = mount((
      <Dropdown open useTriggerWidth={false} trigger={<button>toggle</button>}>
        <div>test</div>
      </Dropdown>
    ))

    const dropdownContent = wrapper.find(Dropdown.Content)

    expect(dropdownContent).toHaveStyleRule('min-width', '160px')

    wrapper.unmount()
  })

  test('uses full available width, when useTriggerWidth is true', () => {
    const wrapper = mount((
      <Dropdown open useTriggerWidth trigger={<button>toggle</button>}>
        <div>test</div>
      </Dropdown>
    ))

    const dropdownContent = wrapper.find(Dropdown.Content)

    expect(dropdownContent).toHaveStyleRule('min-width', '100%')

    wrapper.unmount()
  })
})
