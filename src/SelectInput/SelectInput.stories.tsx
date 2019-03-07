import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Dropdown } from '../Dropdown'

import { SelectInput } from './'
import styled, { css } from 'styled-components'

const Row = styled.div<{ columns?: number | false }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
  `}
`

export default storiesOf('forms|SelectInput', module)
  .addDecorator(withState({
    isOpen: false
  }))
  .add('default', ({ state, storeState }) => (
    <Row columns={1}>
      <Dropdown useButtonWidth open={state.isOpen} button={
        <SelectInput placeholder='Choose option' onClick={() => storeState({ ...state, isOpen: !state.isOpen })}/>
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
        <SelectInput outlined primary value='Primary'/>
        <SelectInput outlined secondary value='Secondary' />
        <SelectInput outlined success value='Success' />
        <SelectInput outlined danger value='Danger' />
      </Row>
    </Row>
  ))
  .add('sizes', () => <Row columns={false}>
    <SelectInput small value='Small' />
    <SelectInput value='Default' />
    <SelectInput large value='Large' />
  </Row>)
  .add('disabled', () => <Row columns={false}>
    <SelectInput disabled value='Disabled' />
    <SelectInput disabled secondary outlined value='Disabled' />
  </Row>)
