import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Hidden, Link } from 'reakit'
import {
  MdDashboard,
  MdInsertChart,
  MdLibraryBooks
} from 'react-icons/md'

import Navigation from './Navigation'
import Icon from './../Icon'

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
  .add('example', () => <Navigation>
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
