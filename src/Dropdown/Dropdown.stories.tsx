import React from 'react'
import Faker from 'faker'
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Dropdown } from '.'
import { Row } from '../utils/stories/components'
import { Flex } from '../Flex'
import { Button } from '../Button'
import { Block } from '../Block'
import { Vertical } from '../useSnapEdgeToParent'

storiesOf('molecules|Dropdown', module)
  .addDecorator(withState({ one: false, two: false, three: false, four: false }))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
      <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
        <div>
            <Dropdown
            open={state.one}
            triggerComponent={
              <Button secondary onClick={() => storeState({ one: !state.one })}>Click me</Button>
            }>
            <div style={{ width: 300 }}>
              {Faker.lorem.paragraphs(2)}
            </div>
          </Dropdown>
        </div>
      </Flex>
  ))
  .add('position', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' height={500} width={1000}>
      <Row columns={4}>
        <Dropdown
          open={state.one}
          horizontal='right'
          triggerComponent={
            <Button secondary onClick={() => storeState({ one: !state.one })}>position right</Button>
          }>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Dropdown>
        <Dropdown
          open={state.two}
          horizontal='left'
          triggerComponent={
            <Button secondary onClick={() => storeState({ two: !state.two })}>position left</Button>
          }>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Dropdown>
        <Dropdown
          open={state.three}
          vertical={Vertical.TOP}
          triggerComponent={
            <Button secondary onClick={() => storeState({ three: !state.three })}>position top</Button>
          }>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Dropdown>
        <Dropdown
          open={state.four}
          vertical={Vertical.BOTTOM}
          triggerComponent={
            <Button secondary onClick={() => storeState({ four: !state.four })}>position bottom</Button>
          }>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Dropdown>
      </Row>
    </Flex>
  ))
