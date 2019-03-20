import React from 'react'
import { storiesOf } from '@storybook/react'
import { Block } from '../Block'
import { Heading } from '../Heading'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { Radio } from '.'

storiesOf('interact|Radio', module)
  .addDecorator(withState(1))
  .add('default', () => (
    <>
      <Block><Radio checked={true} /></Block>
      <Block><Radio checked={false} /></Block>
    </>
  ))
  .add('with label', ({ state, storeState }: any) => (
    <>
      <Block>
        <Radio checked={state === 1} onChange={storeAndAction(storeState, 'onChange', 1)} label='Choose option 1' />
      </Block>
      <Block>
        <Radio checked={state === 2} onChange={storeAndAction(storeState, 'onChange', 2)} label='Choose option 2' />
      </Block>
    </>
  ))
  .add('with custom label', () => (
    <Radio checked={true} label={
      <Heading style={{ marginTop: 0 }}>Check me out</Heading>
    } />
  ))
