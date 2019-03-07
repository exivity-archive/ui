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
  margin: 10px;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
  `}
`

storiesOf('forms|TextInputWithIcon', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <Row columns={false}>
    <TextInputWithIcon
      icon={<MdVerifiedUser/>}
      placeholder='Type something...'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
    <TextInputWithIcon
      iconLeft
      icon={<MdVerifiedUser/>}
      placeholder='Type something...'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
  </Row>)
  .add('outlined', () => (
      <Row columns={false}>
        <TextInputWithIcon icon={<MdVerifiedUser/>} outlined value='Outlined' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} outlined value='Outlined' />
      </Row>
  ))
  .add('purposes', () => (
    <Row columns={false}>
      <Row columns={4}>
        <TextInputWithIcon icon={<MdVerifiedUser/>} primary value='Primary' />
        <TextInputWithIcon icon={<MdVerifiedUser/>} secondary value='Secondary' />
        <TextInputWithIcon icon={<MdVerifiedUser/>} success value='Success' />
        <TextInputWithIcon icon={<MdVerifiedUser/>} danger value='Danger' />
        <TextInputWithIcon icon={<MdVerifiedUser/>} outlined primary value='Primary'/>
        <TextInputWithIcon icon={<MdVerifiedUser/>} outlined secondary value='Secondary' />
        <TextInputWithIcon icon={<MdVerifiedUser/>} outlined success value='Success' />
        <TextInputWithIcon icon={<MdVerifiedUser/>} outlined danger value='Danger' />
       </Row>
      <Row columns={4}>
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} primary value='Primary' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} secondary value='Secondary' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} success value='Success' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} danger value='Danger' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} outlined primary value='Primary'/>
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} outlined secondary value='Secondary' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} outlined success value='Success' />
        <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} outlined danger value='Danger' />
      </Row>
    </Row>
  ))
  .add('sizes', () => <Row columns={false}>
    <TextInputWithIcon icon={<MdVerifiedUser/>} small value='Small' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} value='Default' />
    <TextInputWithIcon icon={<MdVerifiedUser/>} large value='Large' />
    <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} small value='Small' />
    <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} value='Default' />
    <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} large value='Large' />
  </Row>)
  .add('disabled', () => <Row columns={false}>
    <TextInputWithIcon icon={<MdVerifiedUser/>} disabled value='Disabled' />
    <TextInputWithIcon iconLeft icon={<MdVerifiedUser/>} disabled value='Disabled' />
  </Row>)
