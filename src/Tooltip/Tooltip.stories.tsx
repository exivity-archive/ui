import React from 'react'
import { MdInfo } from 'react-icons/md'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Tooltip, TooltipPlacement } from '.'
import { Row } from '../utils/stories/components'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { Block } from '../Block'
import { Icon } from '../Icon'

const TriggerIcon = React.forwardRef<any, any>((props, ref) => (
  <Icon ref={ref}><MdInfo /></Icon>
))

type ControlledTriggerProps = {
  onClick: () => void
}

const ControlledTrigger = React.forwardRef<any, ControlledTriggerProps>((props, ref) => (
  <Button {...props} ref={ref}>Click me</Button>
))

storiesOf('molecules|Tooltip', module)
  .addDecorator(withState({ one: false, two: false, three: false, four: false }))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          placement={TooltipPlacement.TOP}
          TriggerComponent={TriggerIcon}
        >
          <div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('close on outside click', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          placement={TooltipPlacement.TOP}
          onOutsideClick={({ close }) => close()}
          TriggerComponent={TriggerIcon}
        >
          <div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('controlled', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip<ControlledTriggerProps>
          open={state.one}
          placement={TooltipPlacement.TOP}
          TriggerComponent={ControlledTrigger}
          triggerComponentProps={{
            onClick: () => storeState({ one: !state.one })
          }}
        >
          <div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('offset', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          placement={TooltipPlacement.TOP}
          TriggerComponent={TriggerIcon}
          offset={20}
        >
          <div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('position', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' height={800} width={1000}>
      <Row columns={4}>
        <Tooltip
          placement={TooltipPlacement.RIGHT}
          TriggerComponent={TriggerIcon}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Tooltip>
        <Tooltip
          placement={TooltipPlacement.LEFT}
          TriggerComponent={TriggerIcon}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Tooltip>
        <Tooltip
          placement={TooltipPlacement.TOP}
          TriggerComponent={TriggerIcon}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Tooltip>
        <Tooltip
          placement={TooltipPlacement.BOTTOM}
          TriggerComponent={TriggerIcon}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Tooltip>
      </Row>
    </Flex>
  ))
