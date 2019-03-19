import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'

import { Code } from '.'
import { Paragraph } from '../Paragraph'

const code = `import { CodeBlock } from '@exivity/ui'

<CodeBlock language='jsx'>{this}</CodeBlock>`

storiesOf('atoms|Code', module)
  .add('default', () => <Paragraph>This is some <Code>inline code</Code> right here.</Paragraph>)
  .add('block', () => <Code block language='jsx'>{code}</Code>)
