import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { styled, Block, Hidden, Link } from 'reakit'
import { theme } from 'styled-tools'
import {
  MdDashboard,
  MdInsertChart,
  MdLibraryBooks
} from 'react-icons/md'

import { preciseRm } from './../theme/theme'
import Navigation from './Navigation'
import Icon from './../Icon'

const StyledItem = styled(Navigation.Item)`
margin-bottom: 0 !important;

button {
  display: block;
}

${Link} {
  font-family: ${theme('type.fonts.interact.family')};
  font-weight: ${theme('type.fonts.interact.weight')};
  font-size: ${props => preciseRm(props.theme.scale.large)}em;
  
  width: 100%;
  grid-gap: 0;
  grid-template-columns: 2em 1fr 1em;
  text-align: left;
  
  border-radius: 0;
  padding: ${theme('base.space')};
  
  &:focus {
    box-shadow: none;
  }
}
`

const StyledToggle = styled(Navigation.Toggle)`
${Link} {
  font-family: ${theme('type.fonts.interact.family')};
  font-weight: ${theme('type.fonts.interact.weight')};
  padding: 0;
  font-size: 1em;
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
  font-family: ${theme('type.fonts.interact.family')};
  font-weight: ${theme('type.fonts.interact.weight')};
  padding: 0.25em 0.25em 0.25em ${props => preciseRm(props.theme.scale.large * 3)}em;
  font-size: 1em;
}
`

storiesOf('molecules|Navigation', module)
  .add('item', () => <Navigation.Item>
    <Link href='.'>
      <Icon><MdDashboard /></Icon>
      Dashboard
    </Link>
  </Navigation.Item>)
  .add('toggle', () => <Navigation.Toggle toggle={action('toggle')}>
    <Icon><MdDashboard /></Icon>
    Dashboard
  </Navigation.Toggle>)
  .add('flat', () => <Navigation>
    <Navigation.Item>
      <Link href='.'>
        <Icon><MdDashboard /></Icon>
        Dashboard
      </Link>
    </Navigation.Item>
    <Navigation.Item>
      <Link href='.'>
        <Icon><MdInsertChart /></Icon>
        Reports
      </Link>
    </Navigation.Item>
    <Navigation.Item>
      <Link href='.'>
        <Icon><MdLibraryBooks /></Icon>
        Catalogue
      </Link>
    </Navigation.Item>
  </Navigation>)
  .add('toggled', () => <Navigation>
    <Hidden.Container>
      {hidden => (
        <Navigation.Item>
          <Navigation.Toggle {...hidden}>
            <Icon><MdDashboard /></Icon>
            Dashboard
          </Navigation.Toggle>
          <Navigation.Hidden {...hidden}>
            <Navigation.Item>
              <Link href='.'>Accounts</Link>
            </Navigation.Item>
            <Navigation.Item>
              <Link href='.'>Services</Link>
            </Navigation.Item>
            <Navigation.Item>
              <Link href='.'>Instances</Link>
            </Navigation.Item>
          </Navigation.Hidden>
        </Navigation.Item>
      )}
    </Hidden.Container>
    <Navigation.Item>
      <Link href='.'>
        <Icon><MdInsertChart /></Icon>
        Reports
      </Link>
    </Navigation.Item>
    <Navigation.Item>
      <Link href='.'>
        <Icon><MdLibraryBooks /></Icon>
        Catalogue
      </Link>
    </Navigation.Item>
  </Navigation>)
  .add('styled', () => <Navigation>
    <Hidden.Container>
      {hidden => (
        <Block as={StyledItem}>
          <StyledToggle {...hidden} palette='secondary'>
            <Icon><MdDashboard /></Icon>
            Dashboard
          </StyledToggle>
          <Navigation.Hidden {...hidden}>
            <StyledSubItem>
              <Link palette='secondary' href='.'>Accounts</Link>
            </StyledSubItem>
            <StyledSubItem>
              <Link palette='secondary' href='.'>Services</Link>
            </StyledSubItem>
            <StyledSubItem>
              <Link palette='secondary' href='.'>Instances</Link>
            </StyledSubItem>
          </Navigation.Hidden>
        </Block>
      )}
    </Hidden.Container>
    <StyledItem>
      <Link palette='secondary' href='.'>
        <Icon><MdInsertChart /></Icon>
        Reports
      </Link>
    </StyledItem>
    <StyledItem>
      <Link palette='secondary' href='.'>
        <Icon><MdLibraryBooks /></Icon>
        Catalogue
      </Link>
    </StyledItem>
  </Navigation>)
