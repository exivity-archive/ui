import React from 'react'
import { storiesOf } from '@storybook/react'

import { SearchableList } from './SearchableList'

const data = [
  { key: 'one', value: 'one' },
  { key: 'two', value: 'two' },
  { key: 'three', value: 'three' },
  { key: 'four', value: 'four' },
  { key: 'five', value: 'five' },
  { key: 'six', value: 'six' }
]

storiesOf('interact|SearchableList', module)
  .add('default', () => <SearchableList placeholder='Search...' data={data} onChange={console.log}/>)
