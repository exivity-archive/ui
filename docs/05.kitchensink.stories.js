import React from 'react'
import { storiesOf } from '@storybook/react'

import { styled, Box, Grid, Image } from 'reakit'
import { theme } from 'styled-tools'

import Global from '../src/Global'

const headerHeight = 60
const sidebarWidth = 250

const layout = `
  "logo header" ${headerHeight}px
  "nav main" 1fr / ${sidebarWidth}px 1fr 
`

const Ellipsis = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Header = styled(Box)`
  line-height: ${headerHeight}px;
  padding-left: ${theme('base.space')};
`

storiesOf('Docs', module)
  .add('Kitchen sink', () => <React.Fragment>
    <Global scrollbar />
    <Grid template={layout} style={{
      position: 'fixed',
      left: '0',
      top: '0',
      height: '100vh',
      width: '100vw'
    }}>
      <Grid.Item as='header' area='logo' palette='primary' tone={2} opaque>
        <Image src='http://acmelogos.com/images/logo-8.svg' width={sidebarWidth} height={headerHeight} padding={10} />
      </Grid.Item>
      <Grid.Item as={[Ellipsis, Header, 'header']} area='header' palette='primary' opaque>
      Header
      </Grid.Item>
      <Grid.Item as='nav' area='nav' palette='grayscale' tone={1} opaque style={{ overflow: 'auto' }}>
      Nav
        <div style={{ height: '150vh' }} />
      </Grid.Item>
      <Grid.Item as='main' area='main' style={{ overflow: 'auto' }}>
      Main
        <div style={{ height: '150vh' }} />
      </Grid.Item>
    </Grid>
  </React.Fragment>)
