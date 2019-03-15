import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withState } from '../utils/tests/decorators/StateDecorator'

import { Select } from './'

const items = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
  { key: '3', value: 'three' },
  { key: '4', value: 'four' }
]

export default storiesOf('molecules/Select', module)
  .addDecorator(withState({ key: '1', value: 'one' }))
  .add('default', ({ state, storeState }) => <Select value={state.key} onChange={storeState} data={items}/>)
