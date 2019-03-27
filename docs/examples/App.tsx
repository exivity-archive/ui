import * as React from 'react'
import styled from 'styled-components'
import { Flex, Grid, Heading, Image } from '../../src'
import { StyledHeading } from '../../src/Heading/Heading'
import { fromTheme, globalScrollbar } from '../../src/utils/styled'
import { PrimaryNav } from './PrimaryNav'
import { SecondaryNav } from './SecondaryNav'

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
  padding: 0 ${fromTheme(theme => theme.global.baseSpacing)}em;

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
    <Flex as={Header}>
      <Flex.Item as={Heading} noMargin grow={1}>Dashboard</Flex.Item>
      <SecondaryNav />
    </Flex>
    <Sidebar>
      <PrimaryNav />
    </Sidebar>
    <Main>
      {children}
    </Main>
  </Canvas>
)
