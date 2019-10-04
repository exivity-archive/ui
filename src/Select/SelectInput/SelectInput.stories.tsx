import React from 'react'
import { storiesOf } from '@storybook/react'

import { withState } from '../../utils/tests/decorators/StateDecorator'
import { Row } from '../../utils/stories/components'
import { Dropdown } from '../..'

import { SelectInput } from '.'

storiesOf('interact|Select|SelectInput', module)
  .addDecorator(withState({
    isOpen: false
  }))
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Row columns={1}>
      <Dropdown useTriggerComponentWidth open={state.isOpen} triggerComponent={
        <SelectInput placeholder='Choose option' onClick={() => storeState({ ...state, isOpen: !state.isOpen })} />
      } />
    </Row>
  ))
  .add('outlined', () => (
    <Row columns={false}>
      <SelectInput outlined value='Outlined' />
      <SelectInput outlined value='Outlined' />
    </Row>
  ))
  .add('purposes', () => (
    <Row columns={false}>
      <Row columns={4}>
        <SelectInput primary value='Primary' />
        <SelectInput secondary value='Secondary' />
        <SelectInput success value='Success' />
        <SelectInput danger value='Danger' />
        <SelectInput outlined primary value='Primary' />
        <SelectInput outlined secondary value='Secondary' />
        <SelectInput outlined success value='Success' />
        <SelectInput outlined danger value='Danger' />
      </Row>
    </Row>
  ))
  .add('sizes', () => (
    <Row columns={false}>
      <SelectInput small value='Small' />
      <SelectInput value='Default' />
      <SelectInput large value='Large' />
    </Row>
  ))
  .add('disabled', () => (
    <Row columns={false}>
      <SelectInput disabled value='Disabled' />
      <SelectInput disabled secondary outlined value='Disabled' />
    </Row>
  ))
