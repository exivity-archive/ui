import React from 'react'
import { storiesOf } from '@storybook/react'
import { Hidden, List, Link } from 'reakit'
import {
  MdDashboard,
  MdInsertChart,
  MdLibraryBooks
} from 'react-icons/md'

import Navigation from './Navigation'
import Icon from './../Icon'

storiesOf('molecules|Navigation', module)
  .add('default', () => <Navigation>
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
          <Hidden.Toggle as={[Navigation.Item, Link, 'button']} {...hidden}>
            <Icon><MdDashboard /></Icon>
            Dashboard
          </Hidden.Toggle>
          <Hidden as={List} slide='bottom' {...hidden}>
            <Navigation.Item>
              <Link href='.'>Accounts</Link>
            </Navigation.Item>
            <Navigation.Item>
              <Link href='.'>Services</Link>
            </Navigation.Item>
            <Navigation.Item>
              <Link href='.'>Instances</Link>
            </Navigation.Item>
          </Hidden>
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
