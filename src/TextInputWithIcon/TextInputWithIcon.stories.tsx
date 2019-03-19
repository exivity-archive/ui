import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { MdVerifiedUser } from 'react-icons/md'
import { TextInputWithIcon } from '.'
import { Row } from '../utils/stories/components'
import { mockFn } from '../utils/stories/mocks'

storiesOf('interact|TextInputWithIcon', module)
  .addDecorator(withState(''))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <Row columns={false}>
    <TextInputWithIcon
      icon={<MdVerifiedUser/>}
      placeholder='Type something...'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
    <TextInputWithIcon
      iconPosition='left'
      icon={<MdVerifiedUser/>}
      placeholder='Type something...'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
  </Row>)
  .add('outlined', () => (
      <Row columns={false}>
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} outlined value='Outlined' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} outlined value='Outlined' />
      </Row>
  ))
  .add('purposes', () => (
    <Row columns={false}>
      <Row columns={4}>
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} primary value='Primary' />
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} secondary value='Secondary' />
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} success value='Success' />
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} danger value='Danger' />
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} outlined primary value='Primary'/>
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} outlined secondary value='Secondary' />
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} outlined success value='Success' />
        <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} outlined danger value='Danger' />
       </Row>
      <Row columns={4}>
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} primary value='Primary' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} secondary value='Secondary' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} success value='Success' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} danger value='Danger' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} outlined primary value='Primary'/>
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} outlined secondary value='Secondary' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} outlined success value='Success' />
        <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} outlined danger value='Danger' />
      </Row>
    </Row>
  ))
  .add('sizes', () => <Row columns={false}>
    <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} small value='Small' />
    <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} value='Default' />
    <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} large value='Large' />
    <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} small value='Small' />
    <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} value='Default' />
    <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} large value='Large' />
  </Row>)
  .add('disabled', () => <Row columns={false}>
    <TextInputWithIcon onChange={mockFn} icon={<MdVerifiedUser/>} disabled value='Disabled' />
    <TextInputWithIcon onChange={mockFn} iconPosition='left' icon={<MdVerifiedUser/>} disabled value='Disabled' />
  </Row>)
