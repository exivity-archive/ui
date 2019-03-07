import React from 'react'
import faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'

import { Heading } from '.'
import { Paragraph } from '../Paragraph'

storiesOf('atoms|Heading', module)
  .add('header', () => <Heading type='header'>{faker.lorem.sentence(4)}</Heading>)
  .add('screen', () => <Heading type='screen'>{faker.lorem.sentence(4)}</Heading>)
  .add('section', () => <Heading type='section'>{faker.lorem.sentence(4)}</Heading>)
