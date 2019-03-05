import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/testing/decorators/StateDecorator'
import { storeAndAction } from '../utils/testing/storeAndAction'
import Checkbox from '../Checkbox'

storiesOf('forms|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', ({ state, storeState }: any) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} />
  })
