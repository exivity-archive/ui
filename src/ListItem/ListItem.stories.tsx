import React from 'react'
import { storiesOf } from '@storybook/react'

import { ListItem } from './ListItem'

export default storiesOf('atoms/ListItem', module)
  .add('hover focus', () => <ListItem tabIndex={0}>Item value</ListItem>)
