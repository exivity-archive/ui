import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import { Paragraph } from '../Paragraph'

import { Code } from '.'

const code = `import { CodeBlock } from '@exivity/ui'

<CodeBlock language='jsx'>{this}</CodeBlock>`

storiesOf('atoms|Code', module)
  .add('default', () => <Paragraph>This is some <Code>inline code</Code> right here.</Paragraph>)
  .add('block', () => <Code block language='jsx'>{code}</Code>)
  .add('non-existing', () => <Code block language='exivity-js'>Unsupported language displayed as text</Code>)
