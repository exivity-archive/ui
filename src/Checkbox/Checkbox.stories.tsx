import { storiesOf } from '@storybook/react'
import React from 'react'
import { Checkbox } from '.'
import { Block } from '../Block'
import { Heading } from '../Heading'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'

storiesOf('interact|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', () => (
    <>
      <Block><Checkbox checked={true} /></Block>
      <Block><Checkbox checked={false} /></Block>
    </>
  ))
  .add('with label', ({ state, storeState }: any) => (
    <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} label='Enable this setting' />
  ))
  .add('with custom label', () => (
    <Checkbox checked={true} label={
      <Heading style={{ marginTop: 0 }}>Check me out</Heading>
    } />
  ))
