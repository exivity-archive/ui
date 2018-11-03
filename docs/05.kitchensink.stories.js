import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  MdDashboard,
  MdInsertChart,
  MdLibraryBooks
} from 'react-icons/md'
import { styled, Block, Hidden, Link, Box, Grid, Image } from 'reakit'
import { theme, palette } from 'styled-tools'

import Provider from '../src/Provider'
import Navigation from '../src/Navigation'
import { preciseRm } from '../src/theme/theme'
import Icon from '../src/Icon'
import { Icon as StyledIcon } from '../src/Icon/Icon'

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

const StyledItem = styled(Navigation.Item)`
margin-bottom: 0 !important;

button {
  display: block;
}

${Link} {
  font-family: ${theme('type.fonts.interact.family')};
  font-weight: ${theme('type.fonts.interact.weight')};
  font-size: ${preciseRm(0.95)}em;
  text-transform: uppercase;
  
  width: 100%;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 2em 1fr 1em;
  text-align: left;
  
  border-radius: 0;
  padding: ${theme('base.space')};
  
  &:focus,
  &:hover {
    text-decoration: none;
    background-color: rgba(var(--focus-color), 0.1);
    box-shadow: none;
  }
}

${StyledIcon} {
  font-size: ${props => preciseRm(props.theme.scale.xlarge)}em;
}
`

const StyledToggle = styled(Navigation.Toggle)`
${Link} {
  font-size: 1em;

  padding: 0;
  
  &:hover {
    background-color: transparent;
  }
}
`

const StyledSubItem = styled(Navigation.Item)`
margin-bottom: 0 !important;

:first-child {
  margin-top: ${theme('base.space')};
}

:last-child {
  margin-bottom: ${theme('base.space')} !important;
}

${Link} {
  padding: 0.25em 0.25em 0.25em 3em;
  color: ${palette('grayscale', -4)};
  
  &:focus,
  &:hover {
    color: ${palette('grayscale', -2)};
    background-color: transparent;
  }
}
`

storiesOf('Docs', module)
  .add('Kitchen sink', () => <Provider scrollbar>
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
        <Navigation>
          <Hidden.Container>
            {hidden => (
              <Block as={StyledItem}>
                <StyledToggle {...hidden} palette='white'>
                  <Icon><MdDashboard /></Icon>
                  Dashboard
                </StyledToggle>
                <Navigation.Hidden {...hidden}>
                  <StyledSubItem>
                    <Link palette='white' href='.'>Accounts</Link>
                  </StyledSubItem>
                  <StyledSubItem>
                    <Link palette='white' href='.'>Services</Link>
                  </StyledSubItem>
                  <StyledSubItem>
                    <Link palette='white' href='.'>Instances</Link>
                  </StyledSubItem>
                </Navigation.Hidden>
              </Block>
            )}
          </Hidden.Container>
          <Hidden.Container>
            {hidden => (
              <Block as={StyledItem}>
                <StyledToggle {...hidden} palette='white'>
                  <Icon><MdInsertChart /></Icon>
                  Reports
                </StyledToggle>
                <Navigation.Hidden {...hidden}>
                  <StyledSubItem>
                    <Link palette='white' href='.'>Accounts</Link>
                  </StyledSubItem>
                  <StyledSubItem>
                    <Link palette='white' href='.'>Services</Link>
                  </StyledSubItem>
                  <StyledSubItem>
                    <Link palette='white' href='.'>Instances</Link>
                  </StyledSubItem>
                </Navigation.Hidden>
              </Block>
            )}
          </Hidden.Container>
          <StyledItem>
            <Link palette='white' href='.'>
              <Icon><MdLibraryBooks /></Icon>
              Catalogue
            </Link>
          </StyledItem>
        </Navigation>
      </Grid.Item>
      <Grid.Item as='main' area='main' style={{ overflow: 'auto' }}>
      Main
        <div style={{ height: '150vh' }} />
      </Grid.Item>
    </Grid>
  </Provider>)
