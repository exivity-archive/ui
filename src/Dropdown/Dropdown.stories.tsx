import React from 'react'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'

import { withState } from '../utils/tests/decorators/StateDecorator'
import { Row } from '../utils/stories/components'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { Block } from '../Block'

import { Dropdown, DropdownPlacement } from './'

storiesOf('molecules|Dropdown', module)
  .addDecorator(withState({ one: false, two: false, three: false, four: false }))
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Dropdown
          open={state.one}
          trigger={<Button onClick={() => storeState({ one: !state.one })}>Click me</Button>}>
          <div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>
        </Dropdown>
      </div>
    </Flex>
  ))
  .add('position', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' height={800} width={1000}>
      <Row columns={4}>
        <Dropdown
          open={state.one}
          placement={DropdownPlacement.RIGHT}
          trigger={<Button onClick={() => storeState({ one: !state.one })}>Right</Button>}>
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
        <Dropdown
          open={state.two}
          placement={DropdownPlacement.LEFT}
          trigger={<Button onClick={() => storeState({ two: !state.two })}>Left</Button>}>
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
        <Dropdown
          open={state.three}
          placement={DropdownPlacement.TOP}
          trigger={<Button onClick={() => storeState({ three: !state.three })}>Top</Button>}>
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
        <Dropdown
          open={state.four}
          placement={DropdownPlacement.BOTTOM}
          trigger={<Button onClick={() => storeState({ four: !state.four })}>Bottom</Button>}>
          <Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>
        </Dropdown>
      </Row>
    </Flex>
  ))
