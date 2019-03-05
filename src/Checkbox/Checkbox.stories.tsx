import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../../tests/utils/decorators/StateDecorator'
import { storeAndAction } from '../../tests/utils/storeAndAction'
import Checkbox from '../Checkbox'

storiesOf('forms|Checkbox', module)
  .addDecorator(withState(true))
  .add('default', ({ state, storeState }: any) => {
    return <Checkbox checked={state} onChange={storeAndAction(storeState, 'onChange')} />
  })
