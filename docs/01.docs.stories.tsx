import React from 'react'
import { storiesOf } from '@storybook/react'
import { markdown } from '../src/utils/stories/markdown'
import { MaxWidth } from '../src/utils/tests/decorators/MaxWidth'

storiesOf('docs|Guide 👋', module)
  .addDecorator(MaxWidth)
  // Check typeof readme because README.md is not imported from Jest
  // (storyshots) and triggers a React warning
  .add('introduction', markdown(require('../README.md')))
  .add('installation', markdown(require('./guide/installation.md')))
  .add('usage', markdown(require('./guide/usage.md')))
  .add('development', markdown(require('./guide/development.md')))
