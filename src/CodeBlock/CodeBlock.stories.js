import React from 'react'
import { storiesOf } from '@storybook/react'

import CodeBlock from './CodeBlock'

storiesOf('atoms|CodeBlock', module)
  .add('default', () => <CodeBlock>const Component = () => "Hi!"</CodeBlock>)
