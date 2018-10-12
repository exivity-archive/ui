import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import { storiesOf } from '@storybook/react'

import { SIZE_LARGE, SIZE_SMALL } from '../theme'
import Button from './Button'
import Code from '../Code'

storiesOf('atoms|Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('colours', () => <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
    <Button success>Success</Button>
    <Button warning>Warning</Button>
    <Button danger>Danger</Button>
  </div>)
  .add('sizes', () => <Fragment>
    <p>Using convenience props:</p>
    <div>
      <Button small>Small</Button>
      <Button>Normal</Button>
      <Button large>Large</Button>
    </div>
    <p>Using <Code>theme</Code> prop:</p>
    <div>
      <Button theme={{ size: SIZE_SMALL }}>Small</Button>
      <Button>Normal</Button>
      <Button theme={{ size: SIZE_LARGE }}>Large</Button>
    </div>
    <p>Using <Code>ThemeProvider</Code>:</p>
    <div>
      <ThemeProvider theme={{ size: SIZE_SMALL }}>
        <Button>Small</Button>
      </ThemeProvider>
      <Button>Normal</Button>
      <ThemeProvider theme={{ size: SIZE_LARGE }}>
        <Button>Large</Button>
      </ThemeProvider>
    </div>
  </Fragment>)
