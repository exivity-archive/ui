import React from 'react'
import { Heading, Link, Paragraph } from 'reakit'
import { storiesOf } from '@storybook/react'

import CodeBlock from '../src/CodeBlock'
import Code from '../src/Code'

import { maxWidth } from './utils'

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Usage', () => <div>
    <Heading>Usage</Heading>
    <Heading as='h2'>Theme provider</Heading>
    <Paragraph>Wrap your entire app in a <Code>Provider</Code> component from reakit to provide styling capabilities to
      all nested components and use the provided theme:</Paragraph>
    <CodeBlock>
      {`import { Provider } from 'reakit'
import { theme } from '@exivity/ui'

<Provider theme={theme}>
  <App/>
</Provider>`}
    </CodeBlock>
    <Heading as='h2'>Global styles</Heading>
    <Paragraph>This package ships with the
      well-known <Link href='http://necolas.github.io/normalize.css/'>normalize.css</Link> reset and a @import statement for loading the fonts for the default theme. Including those global styles is recommended but optional:
    </Paragraph>
    <CodeBlock>
      {`import { Provider } from 'reakit'
import { Global, theme } from '@exivity/ui'

<Provider theme={theme}>
  <React.Fragment>
    <Global/>
    <App/>
  </React.Fragment>
</Provider>`}
    </CodeBlock>
    <Heading as='h2'>Using local fonts</Heading>
    <Paragraph>...</Paragraph>
  </div>)
