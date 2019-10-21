import React from 'react'
import { storiesOf } from '@storybook/react'

import { Heading } from '../Heading'
import { Block } from '../Block'
import { markdown } from '../utils/stories/markdown'

import { AutoLayout } from './AutoLayout'

import { Column } from './'

storiesOf('molecules|AutoLayout', module)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  .add('overview', markdown(require('./README.md')))
  .add('master/detail', () => (
    <Block height={1000} width={1600} bg='lightgray'>
      <AutoLayout height='100%' spacing={[1, 1, 2]} wrapInWidgets>
        <Column width={300}>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column>
          <Heading>
            Details
          </Heading>
        </Column>
      </AutoLayout>
    </Block>
  ))
  .add(' Sticky  2-master/detail', () => (
    <Block height={1000} width={1600} bg='lightgray'>
      <AutoLayout height='100%' spacing={[1, 1, 2]} wrapInWidgets>
        <Column height={400} width={300} sticky>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column width={300} sticky>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column>
          <Heading>
            Details
          </Heading>
        </Column>
      </AutoLayout>
    </Block>
  ))
  .add('Dashboard', () => (
    <Block height={1000} width={1600} bg='lightgray'>
      <AutoLayout height={800} spacing={[1, 1, 2]} wrapInWidgets>
        <Column width={300} sticky>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column>
          <Heading>
            Details
          </Heading>
        </Column>
        <Column width={300}>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column newRow width={300}>
          <Heading>
            Master
          </Heading>
        </Column>
        <Column>
          <Heading>
            Details
          </Heading>
        </Column>
      </AutoLayout>
    </Block>
  ))
