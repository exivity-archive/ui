import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/testing/decorators/StateDecorator'
import { storeAndAction } from '../utils/testing/storeAndAction'

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
`

export default storiesOf('forms|TextInput', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }) => <TextInput
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
  .add('sizes', () => <Row>
    <TextInput small value='Small' />
    <TextInput value='Default' />
    <TextInput large value='Large' />
  </Row>)
  .add('disabled', () => <TextInput disabled value='Disabled' />)
