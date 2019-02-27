import React from 'react'
import { storiesOf } from '@storybook/react'

import './input'
import './flatlist'
import './structural'
import './label'

storiesOf('Welcome', module)
  .add('to Storybook', () => {
    return <div>
      Welcome to EPIC-UI from exivity!
      <br/>
      <br/>
      All components are typed and tested.
    </div>
  })

