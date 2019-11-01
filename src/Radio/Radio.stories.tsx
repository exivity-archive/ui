import React from 'react'
import { storiesOf } from '@storybook/react'

import { Section } from '../Section'
import { Heading } from '../Heading'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'

import { Radio } from '.'

storiesOf('interact|Radio', module)
  .addDecorator(withState(1))
  .add('default', () => (
    <>
      <Section><Radio checked /></Section>
      <Section><Radio checked={false} /></Section>
    </>
  ))
  .add('with label', ({ state, storeState }: any) => (
    <>
      <Section>
        <Radio
          checked={state === 1}
          label='Choose option 1'
          onChange={storeAndAction(storeState, 'onChange', 1)} />
      </Section>
      <Section>
        <Radio
          checked={state === 2}
          label='Choose option 2'
          onChange={storeAndAction(storeState, 'onChange', 2)} />
      </Section>
    </>
  ))
  .add('with custom label', () => (
    <Radio checked label={
      <Heading style={{ marginTop: 0 }}>Check me out</Heading>
    } />
  ))
