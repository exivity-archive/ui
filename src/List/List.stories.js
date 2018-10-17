import React from 'react'
import { storiesOf } from '@storybook/react'

import List from './List'

storiesOf('atoms|List', module)
  .add('default', () => <List>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </List>)
  .add('unordered', () => <List unordered>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </List>)
  .add('ordered', () => <List ordered>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </List>)
