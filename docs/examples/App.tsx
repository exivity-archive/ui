import * as React from 'react'
import { MdDashboard, MdInsertChart, MdLibraryBooks } from 'react-icons/md'
import styled from 'styled-components'
import { Section, Grid, Icon, Image, Link, Heading } from '../../src'
import { StyledHeading } from '../../src/Heading/Heading'
import { fromTheme, globalScrollbar } from '../../src/utils/styled'

const headerHeight = 60
const sidebarWidth = 250

const template = `
  "logo header" ${headerHeight}px
  "nav main" 1fr / ${sidebarWidth}px 1fr
`

const Canvas = styled(Grid).attrs({
  template
})`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
`

const LogoArea = styled(Grid.Item).attrs({
  as: 'header',
  area: 'logo',
  bg: 'blue'
})``

const Logo = styled(Image).attrs({
  src: 'http://acmelogos.com/images/logo-8.svg',
  padding: 1,
  width: sidebarWidth,
  height: headerHeight
})``

const Header = styled(Grid.Item).attrs({
  as: 'header',
  area: 'header',
  bg: 'lightGray'
})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  line-height: ${headerHeight}px;
  padding-left: ${fromTheme(theme => theme.global.baseSpacing)}em;

  ${StyledHeading} {
    line-height: ${headerHeight}px;
  }
`

const Sidebar = styled(Grid.Item).attrs({
  as: 'nav',
  area: 'nav',
  bg: 'dark'
})`
  overflow: auto;
`

const Main = styled(Grid.Item).attrs({
  as: 'main',
  area: 'main'
})`
  ${globalScrollbar}

  overflow: auto;
`

export const App: React.FC = ({ children }) => (
  <Canvas>
    <LogoArea>
      <Logo />
    </LogoArea>
    <Header>
      <Heading>Dashboard</Heading>
    </Header>
    <Sidebar>
      Navigation
    </Sidebar>
    <Main>
      {children}
    </Main>
  </Canvas>
)
