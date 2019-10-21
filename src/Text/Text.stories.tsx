import React from 'react'
import { storiesOf } from '@storybook/react'

import { markdown } from '../utils/stories/markdown'

import { Text } from '.'

storiesOf('atoms|Text', module)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .add('overview', markdown(require('./README.md')))
  .add('default', () => <Text>Hello</Text>)
  .add('color', () => <Text color='blue'>Hello</Text>)
  .add('responsive', () => (
    <Text
      color={['blue', 'red', 'green']}
      fontSize={[0, 2, 4]}>Resize your window to change me
    </Text>
  ))
