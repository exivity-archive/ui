import React from 'react'
import styled, { css } from 'styled-components'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { MdVerifiedUser } from 'react-icons/md'
import { TextInputWithIcon } from '.'

const Row = styled.div<{ columns?: number | false }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
  `}
`

storiesOf('forms|TextInputWithIcon', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <TextInputWithIcon
    icon={<MdVerifiedUser/>}
    placeholder='Type something...'
    value={state}
    onChange={storeAndAction(storeState, 'onChange')} />)
  .add('outlined', () => <TextInputWithIcon icon={<MdVerifiedUser/>} outlined value='Outlined' />)
  .add('purposes', () => <Row columns={4}>
    <TextInputWithIcon icon={<MdVerifiedUser/>} primary value='Primary' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} secondary value='Secondary' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} success value='Success' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} danger value='Danger' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} outlined primary value='Primary' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} outlined secondary value='Secondary' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} outlined success value='Success' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} outlined danger value='Danger' />
  </Row>)
  .add('sizes', () => <Row columns={false}>
    <TextInputWithIcon icon={<MdVerifiedUser/>} small value='Small' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} value='Default' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} large value='Large' />
  </Row>)
  .add('disabled', () => <TextInputWithIcon icon={<MdVerifiedUser/>} disabled value='Disabled' />)
