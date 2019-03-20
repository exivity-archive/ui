import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'

import { Select } from '.'
import { SelectList } from '../SelectList'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

export default storiesOf('molecules/Select', module)
  .addDecorator(withState())
  .add('default', ({ state, storeState }: any) => (
    <Select value={state && state.value}>
      <SelectList value={state && state.key} onChange={storeState} data={items}/>
    </Select>
  ))
