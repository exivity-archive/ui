import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { Checkbox } from '.'

storiesOf('forms|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', ({ state, storeState }: any) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} />
  })
