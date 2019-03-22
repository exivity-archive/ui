import React from 'react'
import { storiesOf } from '@storybook/react'

import { Searchbar } from './Searchbar'

storiesOf('atoms|Searchbar', module)
  .add('default', () => (
    <Searchbar placeholder='Search...'/>
  ))
  .add('Styled-system', () => (
    <Searchbar placeholder='Search...' m={2} width={500}/>
  ))
