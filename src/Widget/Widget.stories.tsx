import { storiesOf } from '@storybook/react'
import faker from 'faker'
import React from 'react'

import { Widget } from '.'
import { Paragraph } from '../Paragraph'
import { TextInput } from '../TextInput'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Heading } from '../Heading'

storiesOf('molecules|Widget', module)
  .addDecorator(withState('edit me'))
  .add('default', () => (
    <Widget>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
  .add('no padding', () => (
    <Widget>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
  // @ts-ignore
  .add('editable header', ({ state, storeState }: any) => (
    <Widget>
      <Heading as={TextInput} placeholder='placeholder' outlined flat
        value={state} onChange={(text) => storeState(text)}/>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
