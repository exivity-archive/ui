import { storiesOf } from '@storybook/react'
import faker from 'faker'
import React from 'react'

import { Widget } from '.'
import { Paragraph } from '../Paragraph'
import { TextInput } from '../TextInput'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Heading } from '../Heading'
import { Flex } from '..'
import { Block } from '../Block'

storiesOf('molecules|Widget', module)
  .addDecorator(withState('edit me'))
  .add('default', () => (
    <Widget>
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
  // @ts-ignore
  .add('editable header', ({ state, storeState }: any) => (
    <Widget>
      <Heading as={TextInput} placeholder='placeholder' outlined flat
        value={state} onChange={(text) => storeState(text)} />
      <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
    </Widget>
  ))
  .add('sticky', () => (
    <div style={{ height: 400, overflowY: 'scroll' }}>
      <Block height={100} />
      <Widget sticky stickyOffset={10}>
        <Paragraph>{faker.lorem.paragraphs(4)}</Paragraph>
      </Widget>
      <Flex height={1500} justifyContent='flex-end' direction='column'>hi</Flex>
    </div>
  ))
