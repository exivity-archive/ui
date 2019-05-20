import React from 'react'
import { storiesOf } from '@storybook/react'
import { markdown } from '../src/utils/stories/markdown'
import { MaxWidth } from '../src/utils/tests/decorators/MaxWidth'

storiesOf('docs|Guide 👋', module)
  .addDecorator(MaxWidth)
  // Check typeof readme because README.md is not imported from Jest
  // (storyshots) and triggers a React warning
  .add('Introduction', markdown(require('../README.md')))
  .add('Installation', markdown(require('./guide/installation.md')))
  .add('Usage', markdown(require('./guide/usage.md')))
  .add('Development', markdown(require('./guide/development.md')))
