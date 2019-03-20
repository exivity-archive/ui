import React from 'react'
import { mount } from 'enzyme'

import { handleFocus, focusElement } from './helpers'

test('focusElement calls focus on element', () => {
  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  const elementTwo = wrapper.find('#two').instance()
  const spyOne = jest.spyOn(elementOne, 'focus')
  const spyTwo = jest.spyOn(elementTwo, 'focus')
  focusElement(elementOne, elementTwo)

  expect(spyOne).toHaveBeenCalled()
  expect(spyTwo).not.toHaveBeenCalled()
})

test('focusElement calls focus on fallback', () => {
  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  const spy = jest.spyOn(elementOne, 'focus')
  focusElement(null, elementOne)

  expect(spy).toHaveBeenCalled()
})

test('handleFocus - enterKey will click focused element', () => {
  const enterKeyCode = 13

  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  focusElement(elementOne, null)
  const spy = jest.spyOn(elementOne, 'click')
  handleFocus(enterKeyCode, elementOne, null, null)

  expect(spy).toHaveBeenCalled()
})

test('handleFocus - downKey will focus next element', () => {
  const downKeyCode = 40

  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
      <li id='three'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  const elementTwo = wrapper.find('#two').instance()
  const elementThree = wrapper.find('#three').instance()

  const spyOne = jest.spyOn(elementTwo, 'focus')
  const spyTwo = jest.spyOn(elementThree, 'focus')

  focusElement(elementOne, null)
  handleFocus(downKeyCode, elementOne, null, null)

  expect(spyOne).toHaveBeenCalled()
  expect(spyTwo).not.toHaveBeenCalled()
})

test('handleFocus - upKey will focus previous element', () => {
  const downKeyCode = 38

  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
      <li id='three'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  const elementTwo = wrapper.find('#two').instance()
  const elementThree = wrapper.find('#three').instance()

  const spyOne = jest.spyOn(elementOne, 'focus')
  const spyTwo = jest.spyOn(elementTwo, 'focus')

  focusElement(elementThree, null)
  handleFocus(downKeyCode, elementThree, null, null)

  expect(spyOne).not.toHaveBeenCalled()
  expect(spyTwo).toHaveBeenCalled()
})

test('handleFocus - downKey will focus first element if no next element', () => {
  const downKeyCode = 40

  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
      <li id='three'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  const elementTwo = wrapper.find('#two').instance()
  const elementThree = wrapper.find('#three').instance()

  const spyOne = jest.spyOn(elementOne, 'focus')
  const spyTwo = jest.spyOn(elementTwo, 'focus')

  focusElement(elementThree, null)
  handleFocus(downKeyCode, elementThree, elementOne, elementThree)

  expect(spyOne).toHaveBeenCalled()
  expect(spyTwo).not.toHaveBeenCalled()
})

test('handleFocus - upKey will focus last element if no previous element', () => {
  const upKeyCode = 38

  const wrapper = mount(
    <ul>
      <li id='one'>one</li>
      <li id='two'>two</li>
      <li id='three'>two</li>
    </ul>
  )

  const elementOne = wrapper.find('#one').instance()
  const elementTwo = wrapper.find('#two').instance()
  const elementThree = wrapper.find('#three').instance()

  const spyOne = jest.spyOn(elementOne, 'focus')
  const spyTwo = jest.spyOn(elementTwo, 'focus')

  focusElement(elementOne, null)
  handleFocus(upKeyCode, elementOne, elementOne, elementThree)

  expect(spyOne).toHaveBeenCalled()
  expect(spyTwo).not.toHaveBeenCalled()
})
