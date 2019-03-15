Development
Quick start
To quickly create a new Alert component, run:

yarn create-component Alert
Scaffolding
At the bare minimum, components will have two files:

src/
└── Alert/
    ├── index.js
    └── Alert.js
index.js is merely a wrapper around the actual component, for easier importing:

export { default } from './Alert'
Alert.js contains the component itself:

import PropTypes from 'prop-types'
import { Box, styled } from 'reakit'
import { theme } from 'styled-tools'

import withEnumProps from '../withEnumProps'

const Alert = styled(Box)`
  padding: ${theme('base.spaceHalf')} ${theme('base.space')};
  border-radius: ${theme('base.borderRadius')};
`

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

export default withEnumProps(Alert, { palette: 'key' })
Stories
Add a Alert.stories.js file:

import React from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './Alert'

storiesOf('atoms|Alert', module)
  .add('default', () => <Alert>Warning!</Alert>)
  .add('danger', () => <Alert danger>Danger!</Alert>)
Tests
Add a Alert.test.js file:

/* eslint-disable no-undef */
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
})
Wrapping up
The folder structure for our component will now look like this:

src/
├── Alert/
|   ├── index.js
|   ├── Alert.js
|   ├── Alert.stories.js
|   └── Alert.test.js
└── index.js
Finally, add this line to src/index.js:

export { default as Alert } from './Alert'

Git workflow
------------

Please use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) for your commit messages so automatic releasing actually generates meaningful version numbers.

| command | for |
|---------|------|
| yarn start | run storybook and jest in watch mode
| yarn build | build docs and compile typescript

