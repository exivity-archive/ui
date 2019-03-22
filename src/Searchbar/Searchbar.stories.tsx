import React from 'react'
import { storiesOf } from '@storybook/react'

import { Searchbar } from './Searchbar'

storiesOf('atoms|Searchbar', module)
  .add('default', () => (
    <Searchbar m={1}/>
  ))
  .add('Styled-system', () => (
    <Searchbar m={2} width={500}/>
  ))
