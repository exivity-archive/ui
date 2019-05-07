import React from 'react'
import { storiesOf } from '@storybook/react'

import { AutoLayout, Column } from './AutoLayout'
import { Heading } from '../Heading'
import { Block } from '../Block'

storiesOf('molecules|AutoLayout', module)
  .addDecorator(story => <Block height={1500} width={1600} bg='lightgray' children={story()}/>)
  .add('master/detail', () => (
    <AutoLayout p={2} height='100%' wrapInWidgets>
      <Column height='calc(100vh - 40px)' width={300} sticky>
        <Heading>
          Master
        </Heading>
      </Column>
      <Column grow={1}>
        <Heading>
          Details
        </Heading>
      </Column>
    </AutoLayout>
  ))
  .add('2-master/detail', () => (
    <AutoLayout p={2} height='100%' wrapInWidgets>
      <Column height='calc(100vh - 40px)' width={300} sticky>
        <Heading>
          Master
        </Heading>
      </Column>
      <Column height='calc(100vh - 40px)' width={300} sticky>
        <Heading>
          Master
        </Heading>
      </Column>
      <Column grow={1}>
        <Heading>
          Details
        </Heading>
      </Column>
    </AutoLayout>
  ))
  .add('Dashboard', () => (
    <AutoLayout p={2} height='100%' wrapInWidgets>
      <Column width={300}>
        <Heading>
          Master
        </Heading>
      </Column>
      <Column grow={1}>
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
      <Column grow={1}>
        <Heading>
          Details
        </Heading>
      </Column>
    </AutoLayout>
  ))
  .add('extensive', () => (
    <AutoLayout p={[0,1,2]} height='100%' wrapInWidgets>
      <Column id='column' sticky minHeight={800}>1</Column>
      <Column>
        <div style={{ height: 1000, width: 100 }}>
          yo
        </div>
      </Column>
      <Column grow='4' sticky>3</Column>
      <AutoLayout height='50%' sticky wrapInWidgets>
        <Column>5</Column>
        <Column newRow>6</Column>
      </AutoLayout>
      <AutoLayout>
        <Column>5</Column>
        <Column newRow>6</Column>
      </AutoLayout>
      <AutoLayout wrapInWidgets sticky stickyOffset={200}>
        <Column>7</Column>
        <Column newRow>8</Column>
        <Column newRow>9</Column>
        <AutoLayout wrapInWidgets>
          <Column>7</Column>
          <Column newRow>8</Column>
          <Column newRow>9</Column>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  ))
