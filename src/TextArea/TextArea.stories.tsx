import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { TextArea } from '.'
import styled, { css } from 'styled-components'

const Row = styled.div<{ columns?: number | false }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(350px));
  `}
`

storiesOf('forms|TextArea', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <TextArea
    rows={5}
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', ({ state, storeState }: any) => <TextArea
    rows={5}
    value={state}
    outlined
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('purposes', () => <Row columns={4}>
    <TextArea primary value='Primary' />
    <TextArea secondary value='Secondary' />
    <TextArea success value='Success' />
    <TextArea danger value='Danger' />
    <TextArea outlined primary value='Primary' />
    <TextArea outlined secondary value='Secondary' />
    <TextArea outlined success value='Success' />
    <TextArea outlined danger value='Danger' />
  </Row>)
  .add('disabled', ({ state, storeState }: any) => <Row columns={2}>
    <TextArea
    rows={5}
    value={state}
    disabled
    onChange={storeAndAction(storeState, 'onChange')} />
    <TextArea
      rows={5}
      value={state}
      disabled
      outlined
      onChange={storeAndAction(storeState, 'onChange')} />
  </Row>)
