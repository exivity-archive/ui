import React from 'react'
import { storiesOf } from '@storybook/react'

import { Overlay } from './Overlay'

export default storiesOf('atoms/Overlay', module)
  .add('default', () => (
    <Overlay />
  ))
