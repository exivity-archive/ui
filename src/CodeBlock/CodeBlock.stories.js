import React from 'react'
import { storiesOf } from '@storybook/react'

import CodeBlock from './CodeBlock'

storiesOf('atoms|CodeBlock', module)
  .add('default', () => <CodeBlock>{`import CodeBlock from '@exivity/ui/CodeBlock'

<CodeBlock language='jsx'>
    {\`import CodeBlock from '@exivity/ui/CodeBlock'

    <CodeBlock language='jsx'>{this}</CodeBlock>\`}
</CodeBlock>`}</CodeBlock>)
