import React from 'react'
import faker from 'faker'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { MdFavorite } from 'react-icons/md'

import { Heading } from '.'
import { Icon } from '../Icon'

storiesOf('atoms|Heading', module)
  .add('header', () => <Heading type='header'>{faker.lorem.sentence(4)}</Heading>)
  .add('screen', () => <Heading type='screen'>{faker.lorem.sentence(4)}</Heading>)
  .add('section', () => <Heading type='section'>{faker.lorem.sentence(4)}</Heading>)
  .add('icon', () => <Heading type='section'><Icon><MdFavorite /></Icon> {faker.lorem.sentence(4)}</Heading>)