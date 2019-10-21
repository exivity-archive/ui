import React from 'react'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'

import { Delay } from './Delay'

storiesOf('atoms|Delay', module)
  .add('default', () => {
    return (
      <>
        <Delay wait={1000}>
          <div>{Faker.lorem.paragraph()}</div>
        </Delay>
      </>
    )
  })
