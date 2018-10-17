import React from 'react'
import { Heading, Paragraph } from 'reakit'
import { storiesOf } from '@storybook/react'

import CodeBlock from '../src/CodeBlock'
import Code from '../src/Code'

import { maxWidth } from './utils'

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Development', () => <div>
    <Heading>Development</Heading>
    <Heading as='h2'>Quick start</Heading>
    <Paragraph>To quickly create a new Alert component, run:</Paragraph>
    <CodeBlock language='bash'>{`yarn create-component Alert`}</CodeBlock>
    <Heading as='h2'>Scaffolding</Heading>
    <Paragraph>At the bare minimum, components will have two files:</Paragraph>
    <CodeBlock>{`src/
└── Alert/
    ├── index.js
    └── Alert.js`}
    </CodeBlock>
    <Paragraph><Code>index.js</Code> is merely a wrapper around the actual component, for easier importing:</Paragraph>
    <CodeBlock>{`export { default } from './Alert'`}</CodeBlock>
    <Paragraph><Code>Alert.js</Code> contains the component itself:</Paragraph>
    <CodeBlock>{`import PropTypes from 'prop-types'
import { Box, styled } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const Alert = styled(Box)\`
  padding: \${theme('base.spaceHalf')} \${theme('base.space')};
  border-radius: \${theme('base.borderRadius')};
\`

Alert.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node.isRequired,

  primary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  danger: PropTypes.bool
}

Alert.defaultProps = {
  opaque: true,
  palette: 'warning'
}

export default withEnumProps(Alert, { palette: 'key' })`}</CodeBlock>
    <Heading as='h2'>Stories</Heading>
    <Paragraph>Add a <Code>Alert.stories.js</Code> file:</Paragraph>
    <CodeBlock>{`import React from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'

storiesOf('atoms|Alert', module)
  .add('default', () => <Alert>Warning!</Alert>)
  .add('danger', () => <Alert danger>Danger!</Alert>)`}</CodeBlock>
    <Heading as='h2'>Tests</Heading>
    <Paragraph>Add a <Code>Alert.test.js</Code> file:</Paragraph>
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
    <Heading as='h2'>Wrapping up</Heading>
    <Paragraph>The folder structure for our component will now look like this:</Paragraph>
    <CodeBlock>{`src/
├── Alert/
|   ├── index.js
|   ├── Alert.js
|   ├── Alert.stories.js
|   └── Alert.test.js
└── index.js`}
    </CodeBlock>
    <Paragraph>Finally, add this line to <Code>src/index.js</Code>:</Paragraph>
    <CodeBlock>{`export { default as Alert } from './Alert'`}</CodeBlock>
  </div>)
