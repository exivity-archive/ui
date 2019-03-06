import React from 'react'
import styled, { css } from 'styled-components'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextInput } from '.'

const Row = styled.div<{ columns?: number | false }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
  `}
`

storiesOf('forms|TextInput', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <TextInput outlined value='Outlined' />)
  .add('purposes', () => <Row columns={4}>
      <TextInput primary value='Primary' />
      <TextInput secondary value='Secondary' />
      <TextInput success value='Success' />
      <TextInput danger value='Danger' />
      <TextInput outlined primary value='Primary' />
      <TextInput outlined secondary value='Secondary' />
      <TextInput outlined success value='Success' />
      <TextInput outlined danger value='Danger' />
    </Row>)
  .add('sizes', () => <Row columns={false}>
    <TextInput small value='Small' />
    <TextInput value='Default' />
    <TextInput large value='Large' />
  </Row>)
  .add('disabled', () => <TextInput disabled value='Disabled' />)