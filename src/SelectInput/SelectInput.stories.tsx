import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Dropdown } from '../Dropdown'
import { Row } from '../utils/stories/components'
import { mockFn } from '../utils/stories/mocks'

import { SelectInput } from './'

export default storiesOf('forms|SelectInput', module)
  .addDecorator(withState({
    isOpen: false
  }))
  .add('default', ({ state, storeState }: any) => (
    <Row columns={1}>
      <Dropdown useTriggerComponentWidth open={state.isOpen} triggerComponent={
        <SelectInput placeholder='Choose option' onClick={() => storeState({ ...state, isOpen: !state.isOpen })} onChange={mockFn}/>
      } />
    </Row>
  ))
  .add('outlined', () => (
    <Row columns={false}>
      <SelectInput outlined value='Outlined' onChange={mockFn}/>
      <SelectInput outlined value='Outlined' onChange={mockFn}/>
    </Row>
  ))
  .add('purposes', () => (
    <Row columns={false}>
      <Row columns={4}>
        <SelectInput primary value='Primary' onChange={mockFn}/>
        <SelectInput secondary value='Secondary' onChange={mockFn}/>
        <SelectInput success value='Success' onChange={mockFn}/>
        <SelectInput danger value='Danger' onChange={mockFn}/>
        <SelectInput outlined primary value='Primary'onChange={mockFn}/>
        <SelectInput outlined secondary value='Secondary' onChange={mockFn}/>
        <SelectInput outlined success value='Success' onChange={mockFn}/>
        <SelectInput outlined danger value='Danger' onChange={mockFn}/>
      </Row>
    </Row>
  ))
  .add('sizes', () => <Row columns={false}>
    <SelectInput small value='Small' onChange={mockFn}/>
    <SelectInput value='Default' onChange={mockFn}/>
    <SelectInput large value='Large' onChange={mockFn}/>
  </Row>)
  .add('disabled', () => <Row columns={false}>
    <SelectInput disabled value='Disabled' onChange={mockFn}/>
    <SelectInput disabled secondary outlined value='Disabled' onChange={mockFn}/>
  </Row>)
