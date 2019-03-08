import faker from 'faker'
import React from 'react'
import styled, { css } from 'styled-components'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { Paragraph } from '../Paragraph'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextInput } from '.'
import { Heading } from '../Heading'

const Row = styled.div<{ columns?: number | false }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
  `}
`

storiesOf('forms|TextInput', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <TextInput
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <TextInput outlined value='Outlined' />)
  .add('inlined', () => <div>
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
    <TextInput inlined value={faker.lorem.words(4)} style={{ marginBottom: '1em' }} />
    <Paragraph>{faker.lorem.words(4)}</Paragraph>
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
      <TextInput inlined primary value='Primary' />
      <TextInput inlined secondary value='Secondary' />
      <TextInput inlined success value='Success' />
      <TextInput inlined danger value='Danger' />
    </Row>)
  .add('sizes', () => <Row columns={false}>
    <TextInput tiny value='Tiny' />
    <TextInput small value='Small' />
    <TextInput value='Default' />
    <TextInput large value='Large' />
  </Row>)
  .add('disabled', () => <TextInput disabled value='Disabled' />)
  .add('as heading', () => <div>
    <Heading type='section' value='Editable heading' inlined as={TextInput} />
    <Paragraph>{faker.lorem.sentences(2)}</Paragraph>
  </div>)
