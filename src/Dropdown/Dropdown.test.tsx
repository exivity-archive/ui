import React, { Ref } from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'

import { Dropdown } from '.'

test('hides content, when open is false', () => {
  const dropdown = mount((
    <Dropdown
      open={false}
      test='dropdown'
      renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => <button ref={ref}>toggle</button>}
    >
      <div>test</div>
    </Dropdown>
  ))

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })
  expect(dropdownContent).toHaveLength(0)
  dropdown.unmount()
})

test('displays content, when open is true', () => {
  const dropdown = mount((
    <Dropdown
      open={true}
      test='dropdown'
      renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => <button ref={ref}>toggle</button>}
    >
      <div>test</div>
    </Dropdown>
  ))

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })
  expect(dropdownContent.hostNodes()).toHaveLength(1)
  dropdown.unmount()
})

test('uses min. width, when useTriggerWidth is false', () => {
  const dropdown = mount((
    <Dropdown
      open={true}
      useTriggerWidth={false}
      test='dropdown'
      renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => <button ref={ref}>toggle</button>}
    >
      <div>test</div>
    </Dropdown>
  ))

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })
  expect(dropdownContent).toHaveStyleRule('min-width', '160px')
  dropdown.unmount()
})

test('uses full available width, when useTriggerWidth is true', () => {
  const dropdown = mount((
    <Dropdown
      open={true}
      useTriggerWidth={true}
      test='dropdown'
      renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => <button ref={ref}>toggle</button>}
    >
      <div>test</div>
    </Dropdown>
  ))

  const dropdownContent = dropdown.find({ 'data-test': 'dropdown-content' })
  expect(dropdownContent).toHaveStyleRule('min-width', '100%')
  dropdown.unmount()
})
