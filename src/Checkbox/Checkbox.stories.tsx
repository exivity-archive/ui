import { storiesOf } from '@storybook/react'
import React from 'react'
import { Checkbox } from '.'
import { Section } from '../Section'
import { Heading } from '../Heading'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'

storiesOf('interact|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', () => (
    <>
      <Section><Checkbox checked={true} /></Section>
      <Section><Checkbox checked={false} /></Section>
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
