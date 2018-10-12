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
    <Table theme={{ spacing: 2 }}>
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

  .add('Development', () => <div>
    <h1>Development</h1>
    <h2>Scaffolding</h2>
    <p>At the bare minimum, components will have two files:</p>
    <CodeBlock>{`src/
└── Alert/
    ├── index.js
    └── Alert.js`}
    </CodeBlock>
    <p><Code>index.js</Code> is merely a wrapper around the actual component, for easier importing:</p>
    <CodeBlock>{`export { default } from './Alert'`}</CodeBlock>
    <p><Code>Alert.js</Code> contains the component itself:</p>
    <CodeBlock>{`import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { themed } from '../theme'

const styles = props => css\`
  background-color: \${props.theme.colours.warning};
  padding: \${props.theme.spacing * props.theme.size}px;
  border-radius: \${props.theme.border.radius};

  \${props.danger && \`
    color: \${props.theme.colours.bg};
    background-color: \${props.theme.colours.danger};
  \`}
\`

// Use styled-components
const Alert = styled.div\`\${styles}\`

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool
}

// Wrap the component with the themed HOC, so props.theme is available even when
// not using a ThemeProvider (useful for testing) and you can pass down a theme
// prop which will override any global theme.
export default themed(Alert)`}</CodeBlock>
    <h2>Stories</h2>
    <p>Add a <Code>Alert.stories.js</Code> file:</p>
    <CodeBlock>{`import React from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'

storiesOf('atoms|Alert', module)
  .add('default', () => <Alert>Warning!</Alert>)
  .add('danger', () => <Alert danger>Danger!</Alert>)`}</CodeBlock>
    <h2>Tests</h2>
    <p>Add a <Code>Alert.test.js</Code> file:</p>
    <CodeBlock>{`/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Alert from './Alert'

test('renders default alert', () => {
  const alert = renderer.create(<Alert>warning</Alert>)
  expect(alert.toJSON()).toMatchSnapshot()
})

test('renders dangerous alert', () => {
  const alert = renderer.create(<Alert danger>danger</Alert>)
  expect(alert.toJSON()).toMatchSnapshot()
})`}</CodeBlock>
    <h2>Wrapping up</h2>
    <p>The folder structure for our component will now look like this:</p>
    <CodeBlock>{`src/
└── Alert/
    ├── index.js
    ├── Alert.js
    ├── Alert.stories.js
    └── Alert.test.js`}
    </CodeBlock>
  </div>)
