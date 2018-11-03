import React from 'react'
import { storiesOf } from '@storybook/react'

import CodeBlock from './CodeBlock'

storiesOf('atoms|CodeBlock', module)
  .add('default', () => <CodeBlock language='jsx'>{`import { CodeBlock } from '@exivity/ui'

<CodeBlock language='jsx'>
    {\`import { CodeBlock } from '@exivity/ui'

    <CodeBlock language='jsx'>{this}</CodeBlock>\`}
</CodeBlock>`}</CodeBlock>)
