import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Calendar } from './Calendar'

storiesOf('interact|Calendar', module)
  .addDecorator(withState(new Date()))
  .add('default', ({ state, storeState }: any) => (
    <Calendar value={state} onChange={storeState}/>
  ))
