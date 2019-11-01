import { storiesOf } from '@storybook/react'
import React from 'react'

import { Section } from '../Section'
import { Heading } from '../Heading'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'

import { Checkbox } from '.'

storiesOf('interact|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', () => (
    <>
      <Section><Checkbox checked /></Section>
      <Section><Checkbox checked={false} /></Section>
    </>
  ))
  .add('with label', ({ state, storeState }: any) => (
    <Checkbox
      checked={state}
      label='Enable this setting'
      onChange={storeAndAction(storeState, 'onChange')} />
  ))
  .add('with custom label', () => (
    <Checkbox checked label={
      <Heading style={{ marginTop: 0 }}>Check me out</Heading>
    } />
  ))
