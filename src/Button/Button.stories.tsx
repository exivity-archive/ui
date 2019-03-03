import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import Button from './Button'

// import { MdFavorite, MdSync } from 'react-icons/md'
// import Icon from './../Icon'

storiesOf('atoms|Button', module)
  .add('default', () => <Button>Take action</Button>)
  .add('primary', () => <Button primary>Update</Button>)
  .add('secondary', () => <Button secondary>View more</Button>)
  .add('success', () => <Button success>Create</Button>)
  .add('danger', () => <Button danger>Delete</Button>)
