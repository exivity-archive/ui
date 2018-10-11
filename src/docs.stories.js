import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import readme from '../README.md'

import CodeBlock from '../src/CodeBlock'
import Code from '../src/Code'
import Markdown from '../src/Markdown/Markdown'
import Table from '../src/Table'

const MaxWidthContainer = styled.div`
  max-width: 50rem;
`
const maxWidth = story => <MaxWidthContainer>
  {story()}
</MaxWidthContainer>

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Introduction', () => <Markdown>{readme}</Markdown>)

  .add('Installation', () => <div>
    <h1>Installation</h1>
    <p>With <Code>yarn</Code>:</p>
    <CodeBlock>
      {`yarn add @exivity/ui`}
    </CodeBlock>
    <p>With <Code>npm</Code>:</p>
    <CodeBlock>
      {`npm i @exivity/ui`}
    </CodeBlock>
    <h1>Dependencies</h1>
    <h2>Direct dependencies</h2>
    <p>The following packages will be automatically installed:</p>
    <Table>
      <thead>
      <tr>
        <th>dependency</th>
        <th>version</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>styled-components</td>
        <td>^4.0.0-beta.11.3</td>
      </tr>
      <tr>
        <td>color</td>
        <td>^3.1.0</td>
      </tr>
      </tbody>
    </Table>
    <h2>Peer dependencies</h2>
    <p>The following packages must be already installed in your project:</p>
    <Table>
      <thead>
      <tr>
        <th>dependency</th>
        <th>version</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>react</td>
        <td>^16.5.2</td>
      </tr>
      <tr>
        <td>react-dom</td>
        <td>^16.5.2</td>
      </tr>
      </tbody>
    </Table>
    <h2>Optional dependencies</h2>
    <p>The following packages may be installed in your project if you plan to use the following components:</p>
    <Table>
      <thead>
      <tr>
        <th>component</th>
        <th>dependency</th>
        <th>version</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><Code>CodeBlock</Code></td>
        <td>react-syntax-highlighter</td>
        <td>^9.0.0</td>
      </tr>
      <tr>
        <td><Code>Markdown</Code></td>
        <td>react-markdown</td>
        <td>^4.0.3</td>
      </tr>
      </tbody>
    </Table>
  </div>)

  .add('Usage', () => <div>
    <h1>Usage</h1>
    <h2>WithStyle</h2>
    <p>Wrap your entire app in a <Code>WithStyle</Code> component to provide styling capabilities to all nested
      components:</p>
    <CodeBlock>
      {`import WithStyle from '@exivity/ui/WithStyle'

<WithStyle>
  <App>
</WithStyle>`}
    </CodeBlock>
    <h2>Theming</h2>
    <p>By default, the <Code>WithStyle</Code> component uses the <Code>defaultTheme</Code>. There are three ways to
      modify a theme: </p>
    <ol>
      <li>make your own theme,</li>
      <li>local theme overrides are supported
        using <Code>ThemeProvider</Code> from <a href='https://www.styled-components.com/docs/advanced#theming'>styled-components</a>
      </li>
      <li>components theme overrides are supported using the <Code>theme</Code> prop.</li>
    </ol>
    <h3>1. make your own theme</h3>
    <CodeBlock>
      {`import WithStyle from '@exivity/ui/WithStyle'
import { defaultTheme, SIZE_SMALL, SIZE_LARGE } from '@exivity/ui/theme'

// Peak inside
console.log(defaultTheme)

// Less is more
const myTheme = {
    ...defaultTheme,
    size: SIZE_SMALL
}

// Entire app will be smaller
<WithStyle theme={myTheme}>
  <App/>
</WithStyle>`}
    </CodeBlock>
    <h3>2. local theme overrides</h3>
    <CodeBlock>
      {`import { SIZE_LARGE } from '@exivity/ui/theme'
import { ThemeProvider } from 'styled-components'

// Render a part of the app larger
<ThemeProvider theme={{ size: SIZE_LARGE }}>
  {/* Larger section */}
</ThemeProvider>`}
    </CodeBlock>
    <h3>3. component theme overrides</h3>
    <CodeBlock>
      {`import { SIZE_LARGE } from '@exivity/ui/theme'

// Large button
<Button theme={{ size: SIZE_LARGE }}>Click me!</Button>

// This particular example however could be more easily written as:
// (note that most components don't have such convenience props)
<Button large>Click me!</Button>`}
    </CodeBlock>
  </div>)
