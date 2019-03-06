import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { MdFavorite } from 'react-icons/md'
import styled from 'styled-components'

import Icon from '../Icon'
import { Button, RoundButton } from '.'

const Row = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(10, fit-content(200px));
`

storiesOf('atoms|Button', module)
  .add('default', () => <Button>Default</Button>)
  .add('purposes', () => <Row>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
    <Button success>Success</Button>
    <Button danger>Danger</Button>
  </Row>)
  .add('sizes', () => <Row>
    <Button small>Small</Button>
    <Button>Default</Button>
    <Button large>Large</Button>
  </Row>)
  .add('outlined', () => <Row>
    <Button outlined primary>Primary</Button>
    <Button outlined secondary>Secondary</Button>
    <Button outlined success>Success</Button>
    <Button outlined danger>Danger</Button>
  </Row>)
  .add('icon', () => <Button><Icon><MdFavorite /></Icon> Favorite</Button>)
  .add('disabled', () => <Button disabled>Disabled</Button>)
  .add('round', () => <RoundButton>Round</RoundButton>)
