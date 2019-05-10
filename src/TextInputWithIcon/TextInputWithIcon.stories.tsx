import React from 'react'

import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { MdVerifiedUser } from 'react-icons/md'
import { TextInputWithIcon } from '.'
import { Row } from '../utils/stories/components'

storiesOf('interact|TextInputWithIcon', module)
  .addDecorator(withState(''))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => <Row columns={false}>
    <TextInputWithIcon
      iconRight={<MdVerifiedUser />}
      placeholder='Type something...'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
    <TextInputWithIcon
      iconLeft={<MdVerifiedUser />}
      placeholder='Type something...'
      value={state}
      onChange={storeAndAction(storeState, 'onChange')} />
  </Row>)
  .add('outlined', () => (
    <Row columns={false}>
      <TextInputWithIcon iconRight={<MdVerifiedUser />} outlined value='Outlined' />
      <TextInputWithIcon iconLeft={<MdVerifiedUser />} outlined value='Outlined' />
    </Row>
  ))
  .add('purposes', () => (
    <Row columns={false}>
      <Row columns={4}>
        <TextInputWithIcon iconRight={<MdVerifiedUser />} primary value='Primary' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} secondary value='Secondary' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} success value='Success' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} danger value='Danger' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} outlined primary value='Primary' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} outlined secondary value='Secondary' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} outlined success value='Success' />
        <TextInputWithIcon iconRight={<MdVerifiedUser />} outlined danger value='Danger' />
      </Row>
      <Row columns={4}>
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} primary value='Primary' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} secondary value='Secondary' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} success value='Success' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} danger value='Danger' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} outlined primary value='Primary' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} outlined secondary value='Secondary' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} outlined success value='Success' />
        <TextInputWithIcon iconLeft={<MdVerifiedUser />} outlined danger value='Danger' />
      </Row>
    </Row>
  ))
  .add('sizes', () => <Row columns={false}>
    <TextInputWithIcon iconRight={<MdVerifiedUser />} small value='Small' />
    <TextInputWithIcon iconRight={<MdVerifiedUser />} value='Default' />
    <TextInputWithIcon iconRight={<MdVerifiedUser />} large value='Large' />
    <TextInputWithIcon iconLeft={<MdVerifiedUser />} small value='Small' />
    <TextInputWithIcon iconLeft={<MdVerifiedUser />} value='Default' />
    <TextInputWithIcon iconLeft={<MdVerifiedUser />} large value='Large' />
  </Row>)
  .add('disabled', () => <Row columns={false}>
    <TextInputWithIcon iconRight={<MdVerifiedUser />} disabled value='Disabled' />
    <TextInputWithIcon iconLeft={<MdVerifiedUser />} disabled value='Disabled' />
  </Row>)
