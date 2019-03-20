import faker from 'faker'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Block } from '../Block'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { NumericInput } from '.'
import { Row } from '../utils/stories/components'

storiesOf('interact|NumericInput', module)
  .addDecorator(withState(''))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <NumericInput
    placeholder='Type an integer...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('step', ({ state, storeState }: any) => <NumericInput
    placeholder='Type a float...'
    step='any'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('min', ({ state, storeState }: any) => <NumericInput
    placeholder='Type a positive float (2 decimal precision)...'
    step='0.01'
    min='0'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <NumericInput outlined value='42' />)
  .add('flat', () => <div>
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
    <Block>
      <NumericInput flat value={42} />
    </Block>
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
  </div>)
  .add('purposes', () => <Row columns={4}>
    <NumericInput primary value='42' />
    <NumericInput secondary value='42' />
    <NumericInput success value='42' />
    <NumericInput danger value='42' />
    <NumericInput outlined primary value='42' />
    <NumericInput outlined secondary value='42' />
    <NumericInput outlined success value='42' />
    <NumericInput outlined danger value='42' />
    <NumericInput flat primary value='42' />
    <NumericInput flat secondary value='42' />
    <NumericInput flat success value='42' />
    <NumericInput flat danger value='42' />
  </Row>)
  .add('sizes', () => <Row columns={false}>
    <NumericInput tiny value='42' />
    <NumericInput small value='42' />
    <NumericInput value='42' />
    <NumericInput large value='42' />
  </Row>)
  .add('disabled', () => <NumericInput disabled value='42' />)
  .add('as heading', () => <div>
    <Heading type='section' value='42' inlined as={NumericInput} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
