import React from 'react'
import { storiesOf } from '@storybook/react'
import { Heading } from '../Heading'
import { TextInput } from '../TextInput'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { Checkbox } from '.'

storiesOf('interact|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', ({ state, storeState }: any) => (
    <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} />
  ))
  .add('with label', ({ state, storeState }: any) => (
    <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} label='Enable this setting' />
  ))
  .add('with custom label', ({ state, storeState }: any) => (
    <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} label={
      <Heading style={{ marginTop: 0 }}>Enable this setting</Heading>
    } />
  ))
