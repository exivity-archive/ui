import React from 'react'
import { Box } from 'reakit'
import { storiesOf } from '@storybook/react'

const maxWidth = story => <Box maxWidth="50rem">
  {story()}
</Box>

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Kitchen sink', () => <div>
    hoi
  </div>)
