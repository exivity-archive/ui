import React, { Ref } from 'react'
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
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Icon ref={ref}>
              <MdInfo />
            </Icon>
          )}>
          <div style={{ width: 300 }}>
            {Faker.lorem.paragraphs(2)}
          </div>
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
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Icon ref={ref}>
                <MdInfo />
            </Icon>
          )}>
          <div style={{ width: 300 }}>
            {Faker.lorem.paragraphs(2)}
          </div>
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
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
              <Button
                ref={ref}
                onClick={() => storeState({ one: !state.one })}
              >
                Click on me
              </Button>
          )}>
          <div style={{ width: 300 }}>
            {Faker.lorem.paragraphs(2)}
          </div>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('controlled. close on outside click', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' bg='lightgray' height={500}>
      <div>
        <Tooltip
          open={state.one}
          placement={TooltipPlacement.TOP}
          onOutsideClick={() => storeState({ one: false })}
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
              <Button
                ref={ref}
                onClick={() => storeState({ one: !state.one })}
              >
                Click on me
              </Button>
          )}>
          <div style={{ width: 300 }}>
            {Faker.lorem.paragraphs(2)}
          </div>
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
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Icon ref={ref}>
                <MdInfo />
            </Icon>
          )}>
          <div style={{ width: 300 }}>
            {Faker.lorem.paragraphs(2)}
          </div>
        </Tooltip>
      </div>
    </Flex>
  ))
  .add('position', ({ state, storeState }: any) => (
    <Flex justifyContent='center' alignItems='center' height={800} width={1000}>
      <Row columns={4}>
        <Tooltip
          open={state.one || false}
          placement={TooltipPlacement.RIGHT}
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Button ref={ref} secondary onClick={() => storeState({ one: !state.one })}>position right</Button>
          )}>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Tooltip>
        <Tooltip
          open={state.two || false}
          placement={TooltipPlacement.LEFT}
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Button ref={ref} secondary onClick={() => storeState({ two: !state.two })}>position left</Button>
          )}>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Tooltip>
        <Tooltip
          open={state.three || false}
          placement={TooltipPlacement.TOP}
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Button ref={ref} secondary onClick={() => storeState({ three: !state.three })}>position top</Button>
          )}>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Tooltip>
        <Tooltip
          open={state.four || false}
          placement={TooltipPlacement.BOTTOM}
          renderTrigger={({ ref }: { ref: Ref<HTMLButtonElement> }) => (
            <Button ref={ref} secondary onClick={() => storeState({ four: !state.four })}>position bottom</Button>
          )}>
          <Block width={200} p={1}>
            {Faker.lorem.paragraphs(2)}
          </Block>
        </Tooltip>
      </Row>
    </Flex>
  ))
