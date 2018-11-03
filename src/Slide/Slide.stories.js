import React from 'react'
import { Button, Block, Group } from 'reakit'
import { storiesOf } from '@storybook/react'
import { withPropKnobs } from '../../docs/utils/withPropKnobs'

import sample from '../../docs/examples/text.md'

import Slide from './Slide'
import Markdown from '../Markdown'

const content = <Markdown>{sample}</Markdown>

storiesOf('molecules|Slide', module)
  .add('default', () => <Slide.Container>
    {hidden => (
      <Block>
        <Group>
          <Slide.Show as={Button} {...hidden}>Show</Slide.Show>
          <Slide.Hide as={Button} {...hidden}>Hide</Slide.Hide>
          <Slide.Toggle as={Button} {...hidden}>Toggle</Slide.Toggle>
        </Group>
        {withPropKnobs(<Slide {...hidden}>{content}</Slide>)}
      </Block>
    )}
  </Slide.Container>)
