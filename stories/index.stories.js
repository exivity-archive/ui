import React, { Fragment } from 'react'

import { addDecorator, storiesOf } from '@storybook/react'

import Button from './../src/Button'
import Progress from './../src/Progress'
import ExivityUI from '../src/ExivityUI'

const StylesDecorator = (storyFn) => <ExivityUI>
  {storyFn()}
</ExivityUI>
addDecorator(StylesDecorator)

storiesOf('Welcome', module)
  .add('Introduction', () => <div>
    <h1>Getting started</h1>
    <p>@todo</p>
  </div>)
  .add('Installation', () => <div>
    <h1>Installation</h1>
    <p>@todo</p>
  </div>)

storiesOf('atoms/Progress', module)
  .add('default', () => <Progress />)
  .add('100%', () => <Progress progress={1} />)

storiesOf('atoms/Button', module)
  .add('default', () => <Button>Default</Button>)
  .add('primary', () => <Button primary>Primary</Button>)
