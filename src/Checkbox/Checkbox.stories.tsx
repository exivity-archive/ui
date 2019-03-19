import React from 'react'
import { storiesOf } from '@storybook/react'
import { Block } from '../Block'
import { Heading } from '../Heading'
import { Label } from '../Label'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { Checkbox } from '.'

storiesOf('interact|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', ({ state, storeState }: any) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} />
  })
  .add('with label', ({ state, storeState }: any) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} label='Enable this setting' />
  })
  .add('with custom label', ({ state, storeState }: any) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} label={<Heading>Enable this setting</Heading>} />
  })
