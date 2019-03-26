import React from 'react'
import { storiesOf } from '@storybook/react'
import { Block } from '../Block'

import { Searchbar } from './Searchbar'

storiesOf('atoms|Searchbar', module)
  .add('default', () => <Searchbar placeholder='Search...'/>)
  .add('animated', () => <Searchbar animated placeholder='Search...'/>)
  .add('with padding', () => (
    <Searchbar placeholder='Search...' padding={2} width={500}/>
  ))
