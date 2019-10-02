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

storiesOf('molecules|Tooltip', module)
  .addDecorator(withState({ one: false, two: false, three: false, four: false }))
  // @ts-ignore
  .add('default', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          placement={TooltipPlacement.TOP}
          content={<div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('open by default', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          defaultOpen={true}
          placement={TooltipPlacement.TOP}
          content={<div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>}
        >
          <Icon><MdInfo/></Icon>
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
          content={<div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('controlled', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          open={state.one}
          placement={TooltipPlacement.TOP}
          content={<div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>}
        >
          <Button onClick={() => storeState({ one: !state.one })}>Click me</Button>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('offset', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
      <Tooltip
          placement={TooltipPlacement.TOP}
          offset={20}
          content={<div style={{ width: 300 }}>{Faker.lorem.paragraphs(2)}</div>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('position', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' height={800} width={1000}>
      <Row columns={4}>
        <Tooltip
          placement={TooltipPlacement.RIGHT}
          closeTimeout={0}
          content={<Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
        <Tooltip
          placement={TooltipPlacement.LEFT}
          closeTimeout={0}
          content={<Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
        <Tooltip
          placement={TooltipPlacement.TOP}
          closeTimeout={0}
          content={<Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
        <Tooltip
          placement={TooltipPlacement.BOTTOM}
          closeTimeout={0}
          content={<Block width={200} p={1}>{Faker.lorem.paragraphs(2)}</Block>}
        >
          <Icon><MdInfo/></Icon>
        </Tooltip>
      </Row>
    </Flex>
  ))
