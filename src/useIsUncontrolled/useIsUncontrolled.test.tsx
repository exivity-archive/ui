import React, { FC, useState } from 'react'
import { mount } from 'enzyme'

import { useIsUncontrolled } from './useIsUncontrolled'

interface OptionallyUncontrolledProps {
  open?: boolean
  onChange?: (value: boolean) => void
}

const OptionallyUncontrolled: FC<OptionallyUncontrolledProps> = (props) => {
  const defaultValue = false
  const [open, setOpen] = useIsUncontrolled(defaultValue, props.open, props.onChange)

  const onClick = () => setOpen(!open)
  return <button data-test='button' onClick={onClick}>{open ? 'open' : 'closed'}</button>
}

test('If no parameters are given it can toggle between open and closed', () => {
  const wrapper = mount(<OptionallyUncontrolled />)

  let button = wrapper.find({ 'data-test': 'button' })

  expect(button.props().children).toBe('closed')

  button.props().onClick()
  wrapper.update()
  button = wrapper.find({ 'data-test': 'button' })

  expect(button.props().children).toBe('open')
})

test('It uses controlled value-setter when both are given', () => {
  const StateComponent: FC = () => {
    const [open, setOpen] = useState(false)
    return <OptionallyUncontrolled open={open} onChange={setOpen} />
  }

  const wrapper = mount(<StateComponent />)

  let button = wrapper.find({ 'data-test': 'button' })

  expect(button.props().children).toBe('closed')

  button.props().onClick()
  wrapper.update()
  button = wrapper.find({ 'data-test': 'button' })

  expect(button.props().children).toBe('open')
})
