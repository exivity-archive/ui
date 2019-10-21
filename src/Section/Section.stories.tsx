import React from 'react'
import { storiesOf } from '@storybook/react'

import { Button } from '../Button'
import { markdown } from '../utils/stories/markdown'

import { Section } from '.'

storiesOf('atoms|Section', module)
  .add('overview', markdown(require('./README.md')))
  .add('default', () => (
    <>
      <Section><Button>Action</Button></Section>
      <Section><Button>Another action</Button></Section>
    </>
  ))
