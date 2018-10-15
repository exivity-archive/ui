import React from 'react'
import { storiesOf } from '@storybook/react'

import { maxWidth } from './utils'

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Kitchen sink', () => <div>
    ...
  </div>)
