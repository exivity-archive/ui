import React from 'react'
import { mount } from 'enzyme'
import { OutsideClickListener } from './OutsideClickListener'

test('onOutsideClick should be called when clicking outside of the container', () => {
  const map: any = {}
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb
  })

  const onOutsideMock = jest.fn()

  const wrapper = mount(
    <div id='outside'>
      <OutsideClickListener onOutsideClick={onOutsideMock}>
        <div id='inside' />
      </OutsideClickListener>
    </div>
  )

  map.click({ target: wrapper.find('#outside').instance() })
  expect(onOutsideMock).toHaveBeenCalled()
})

test('onOutsideClick should not be called when clicking inside of the container', () => {
  const map: any = {}
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb
  })

  const onOutsideMock = jest.fn()

  const wrapper = mount(
    <div id='outside'>
      <OutsideClickListener onOutsideClick={onOutsideMock}>
        <div id='inside' />
      </OutsideClickListener>
    </div>
  )

  map.click({ target: wrapper.find('#inside').instance() })
  expect(onOutsideMock).not.toHaveBeenCalled()
})
