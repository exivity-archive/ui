import React from 'react'
import { storiesOf } from '@storybook/react'

import { Block } from '../Block'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { Text } from '../Text'

import { Grid } from '.'

const template = `
  "header header" 100px
  "sidebar main" 1fr / 200px 1fr
`

storiesOf('atoms|Grid', module)
  .add('default', () => (
    <Grid template={template}>
      <Grid.Item area='header' bg='blue'>
        <Heading>I'm a header</Heading>
      </Grid.Item>
      <Grid.Item area='sidebar' bg='gray'>
        <Block height={500}>
          <Text color='white'>I'm a sidebar</Text>
        </Block>
      </Grid.Item>
      <Grid.Item area='main'>
        <Paragraph>I'm the main body</Paragraph>
      </Grid.Item>
    </Grid>
  ))
