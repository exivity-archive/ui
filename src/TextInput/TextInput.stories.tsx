import React from 'react'
import faker from 'faker'

import { storiesOf } from '@storybook/react'
import { Block } from '../Block'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextInput } from '.'
import { Row } from '../utils/stories/components'

storiesOf('interact|TextInput', module)
  .addDecorator(withState(''))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('required', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    required
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('inline', () => <Paragraph>
    {faker.lorem.words(4)}{' '}
    <TextInput inline value={faker.lorem.words(4)} />{' '}
    {faker.lorem.words(8)}
  </Paragraph>)
  .add('flat', () => <div>
    <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
    <Block>
      <TextInput flat value={faker.lorem.words(4)} />
    </Block>
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
  .add('purposes', () => <Row columns={4}>
      <TextInput primary value='Primary' />
      <TextInput secondary value='Secondary' />
      <TextInput success value='Success' />
      <TextInput danger value='Danger' />
      <TextInput outlined primary value='Primary' />
      <TextInput outlined secondary value='Secondary' />
      <TextInput outlined success value='Success' />
      <TextInput outlined danger value='Danger' />
      <TextInput flat primary value='Primary' />
      <TextInput flat secondary value='Secondary' />
      <TextInput flat success value='Success' />
      <TextInput flat danger value='Danger' />
    </Row>)
  .add('sizes', () => <Row columns={false}>
    <TextInput tiny value='Tiny' />
    <TextInput small value='Small' />
    <TextInput value='Default' />
    <TextInput large value='Large' />
    <TextInput huge value='Huge' />
  </Row>)
  .add('disabled', () => <TextInput disabled value='Disabled' />)
  .add('as heading', () => <div>
    <Heading type='section' value='Editable heading' flat as={TextInput} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
