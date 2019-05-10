import React from 'react'
import faker from 'faker'

import { storiesOf } from '@storybook/react'
import { Section } from '../Section'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { markdown } from '../utils/stories/markdown'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { Input } from '.'
import { Row } from '../utils/stories/components'

storiesOf('interact|Input', module)
  .addDecorator(withState(''))
  .add('overview', markdown(require('./README.md')))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <Input
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <Input outlined value='Outlined' />)
  .add('required', ({ state, storeState }: any) => <Input
    placeholder='Type something...'
    required
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('inline', () => <Paragraph>
    {faker.lorem.words(4)}{' '}
    <Input inline value={faker.lorem.words(4)} />{' '}
    {faker.lorem.words(8)}
  </Paragraph>)
  .add('flat', () => <div>
    <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
    <Section>
      <Input flat value={faker.lorem.words(4)} />
    </Section>
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
  .add('flat + outined', () => <div>
    <Paragraph>{faker.lorem.sentences(1)}</Paragraph>
    <Section>
      <Input flat outlined value={faker.lorem.words(4)} />
    </Section>
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
  .add('purposes', () => <Row columns={4}>
    <Input primary value='Primary' />
    <Input secondary value='Secondary' />
    <Input success value='Success' />
    <Input danger value='Danger' />
    <Input outlined primary value='Primary' />
    <Input outlined secondary value='Secondary' />
    <Input outlined success value='Success' />
    <Input outlined danger value='Danger' />
    <Input flat outlined primary value='Primary' />
    <Input flat outlined secondary value='Secondary' />
    <Input flat outlined success value='Success' />
    <Input flat outlined danger value='Danger' />
  </Row>)
  .add('sizes', () => <Row columns={false}>
    <Input tiny value='Tiny' />
    <Input small value='Small' />
    <Input value='Default' />
    <Input large value='Large' />
    <Input huge value='Huge' />
  </Row>)
  .add('disabled', () => <Input disabled value='Disabled' />)
  .add('as heading', () => <div>
    <Heading type='section' value='Editable heading' flat as={Input} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
