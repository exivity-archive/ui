import { storiesOf } from '@storybook/react'
import faker from 'faker'
import React from 'react'

import { Widget } from '.'
import { Paragraph } from '../Paragraph'

storiesOf('molecules|Widget', module)
  .add('default', () => <Widget title='Title'>
    <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
  </Widget>)
