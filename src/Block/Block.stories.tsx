import { storiesOf } from '@storybook/react'
import React from 'react'

import { Block } from '.'
import { Code } from '../Code'
import { Text } from '../Text'
import { markdown } from '../utils/stories/markdown'

storiesOf('atoms|Block', module)
  .add('readme', markdown(require('./README.md')))
  .add('default', () => (
    <Block>
      <Text>I'm Jenny from the <Code>&lt;Block/&gt;</Code></Text>
    </Block>
  ))
  .add('dimensions', () => (
    <Block width={100} height={100} bg='blue' />
  ))
  .add('padding', () => (
    <Block width={3 / 4} px={2} py={1} bg='yellow'>
      <Text color='red'>Padding and foreground color</Text>
    </Block>
  ))
