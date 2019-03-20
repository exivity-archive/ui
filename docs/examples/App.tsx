import * as React from 'react'
import { MdDashboard, MdInsertChart, MdLibraryBooks } from 'react-icons/md'
import styled from 'styled-components'
import { Block, Grid, Icon, Image, Link } from '../../src'
import { fromTheme } from '../../src/utils/styled'

const headerHeight = 60
const sidebarWidth = 250

const layout = `
  "logo header" ${headerHeight}px
  "nav main" 1fr / ${sidebarWidth}px 1fr
`

const Header = styled.header`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  line-height: ${headerHeight}px;
  padding-left: ${fromTheme(theme => theme.global.spacing)}em;
`

export const App: React.FC = ({ children }) => (
  <Grid template={layout} style={{
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw'
  }}>
    <Grid.Item as='header' area='logo'>
      <Image src='http://acmelogos.com/images/logo-8.svg' width={sidebarWidth} height={headerHeight} />
    </Grid.Item>
    <Grid.Item as={Header} area='header'>
      Header
    </Grid.Item>
    <Grid.Item as='nav' area='nav' style={{ overflow: 'auto' }}>
      Navigation
    </Grid.Item>
    <Grid.Item as='main' area='main' style={{ overflow: 'auto' }}>
      {children}
    </Grid.Item>
  </Grid>
)
