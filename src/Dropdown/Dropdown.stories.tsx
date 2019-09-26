import React, { Ref } from 'react'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Dropdown, DropdownPlacement } from './'
import { Row } from '../utils/stories/components'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { Block } from '../Block'

type TriggerButtonProps = {
  onClick: () => void,
  children: string
}

const DefaultTriggerButton = React.forwardRef<any, any>((props, ref) => (
  <Button secondary {...props} ref={ref}>Click me</Button>
))

const TriggerButton = React.forwardRef<any, any>((props, ref) => (
  <Button secondary {...props} ref={ref} />
))

storiesOf('molecules|Dropdown', module)
  .addDecorator(withState({ one: false, two: false, three: false, four: false }))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Dropdown
          open={state.one}
          TriggerComponent={DefaultTriggerButton}
          onClick={() => storeState({ one: !state.one })}
        >
          <div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>
        </Dropdown>
      </div>
    </Flex>
  ))
  .add('position', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' height={800} width={1000}>
      <Row columns={4}>
        <Dropdown<TriggerButtonProps>
          open={state.one}
          placement={DropdownPlacement.RIGHT}
          TriggerComponent={TriggerButton}
          triggerComponentProps={{
            onClick: () => storeState({ one: !state.one }),
            children: 'RIGHT'
          }}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
        <Dropdown<TriggerButtonProps>
          open={state.two}
          placement={DropdownPlacement.LEFT}
          TriggerComponent={TriggerButton}
          triggerComponentProps={{
            onClick: () => storeState({ two: !state.two }),
            children: 'LEFT'
          }}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
        <Dropdown<TriggerButtonProps>
          open={state.three}
          placement={DropdownPlacement.TOP}
          TriggerComponent={TriggerButton}
          triggerComponentProps={{
            onClick: () => storeState({ three: !state.three }),
            children: 'TOP'
          }}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
        <Dropdown<TriggerButtonProps>
          open={state.four}
          placement={DropdownPlacement.BOTTOM}
          onOutsideClick={() => storeState({ ...state, four: false })}
          TriggerComponent={TriggerButton}
          triggerComponentProps={{
            onClick: () => storeState({ four: !state.four }),
            children: 'BOTTOM'
          }}
        >
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
      </Row>
    </Flex>
  ))
