import React, { FC, useState } from 'react'
import { mount } from 'enzyme'
import { useIsUncontrolled } from './useIsUncontrolled'

interface OptionallyUncontrolledProps {
  open?: boolean
  setOpen?: (newValue: boolean) => void
  onChange?: (value: boolean) => void
}

const OptionallyUncontrolled: FC<OptionallyUncontrolledProps> = (props) => {
  const defaultValue = false
  const [open, setOpen] = useIsUncontrolled(defaultValue, props.open, props.setOpen, props.onChange)

  const onClick = () => setOpen(!open)
  return <button onClick={onClick} data-test='button'>{open ? 'open' : 'closed'}</button>
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

test('If only the open parameter is given it throws an error', () => {
  let message: string = ''
  try {
    mount(<OptionallyUncontrolled open={false} />)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe(
    'Either controlledValue or controlledSetValue is undefined while the other isn\'t. '
    + 'They should either both be defined or both be undefined.'
  )
})

test('If only the setOpen parameter is given it throws an error', () => {
  let message: string = ''
  try {
    mount(<OptionallyUncontrolled setOpen={() => { return }} />)
  } catch (error) {
    message = error.message
  }
  expect(message).toBe(
    'Either controlledValue or controlledSetValue is undefined while the other isn\'t. '
    + 'They should either both be defined or both be undefined.'
  )
})

test('It uses controlled value-setter when both are given', () => {
  const StateComponent: FC = () => {
    const [open, setOpen] = useState(false)
    return <OptionallyUncontrolled setOpen={setOpen} open={open} />
  }

  const wrapper = mount(<StateComponent />)

  let button = wrapper.find({ 'data-test': 'button' })
  expect(button.props().children).toBe('closed')
  button.props().onClick()
  wrapper.update()
  button = wrapper.find({ 'data-test': 'button' })
  expect(button.props().children).toBe('open')
})

test('onChange gets called when setValue gets called', () => {
  let open: boolean
  try {
    const wrapper = mount(<OptionallyUncontrolled onChange={(value) => { throw value }} />)
    let button = wrapper.find({ 'data-test': 'button' })
    button.props().onClick()
    wrapper.update()
  } catch (value) {
    open = value
  }
  expect(open).toBe(true)
})
