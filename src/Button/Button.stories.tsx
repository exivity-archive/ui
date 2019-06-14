import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { MdClear, MdCloud, MdFavorite, MdSave, MdWhatshot } from 'react-icons/md'

import { Icon } from '../Icon'
import { Button } from '.'
import { Row } from '../utils/stories/components'
import { fromTheme } from '../utils/styled'

const Container = styled.div`
  display: flex;
  background-color: ${fromTheme(theme => theme.colors.lightGray)}
  padding: 20px;
`

storiesOf('interact|Button', module)
  .add('default', () => <Button>Default</Button>)
  .add('purposes', () => <Row>
    <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
    <Button success>Success</Button>
    <Button danger>Danger</Button>
  </Row>)
  .add('sizes', () => <Row>
    <Button tiny>Tiny</Button>
    <Button small>Small</Button>
    <Button>Default</Button>
    <Button large>Large</Button>
    <Button huge>Huge</Button>
  </Row>)
  .add('outlined', () => <Row>
    <Button outlined primary>Primary</Button>
    <Button outlined secondary>Secondary</Button>
    <Button outlined success>Success</Button>
    <Button outlined danger>Danger</Button>
  </Row>)
  .add('icon', () => <Button><Icon><MdFavorite /></Icon> Favorite</Button>)
  .add('disabled', () => <Button disabled>Disabled</Button>)
  .add('round', () => <Row columns={4}>
    <Button round primary>☁️</Button>
    <Button round secondary>🔥</Button>
    <Button round success>💾</Button>
    <Button round danger>❌</Button>
    <Button round outlined primary>☁️</Button>
    <Button round outlined secondary>🔥</Button>
    <Button round outlined success>💾</Button>
    <Button round outlined danger>❌</Button>
    <Button round tiny>❤️️</Button>
    <Button round small>❤️️</Button>
    <Button round>❤️️</Button>
    <Button round large>❤️️</Button>
    <Button round outlined tiny>❤️️</Button>
    <Button round outlined small>❤️️</Button>
    <Button round outlined>❤️️</Button>
    <Button round outlined large>❤️️</Button>
    <Button round primary><Icon><MdCloud /></Icon>️</Button>
    <Button round secondary><Icon><MdWhatshot /></Icon></Button>
    <Button round success><Icon><MdSave /></Icon></Button>
    <Button round danger><Icon><MdClear /></Icon></Button>
    <Button round outlined primary><Icon><MdCloud /></Icon>️</Button>
    <Button round outlined secondary><Icon><MdWhatshot /></Icon></Button>
    <Button round outlined success><Icon><MdSave /></Icon></Button>
    <Button round outlined danger><Icon><MdClear /></Icon></Button>
    <Button round tiny><Icon><MdFavorite /></Icon>️</Button>
    <Button round small><Icon><MdFavorite /></Icon>️</Button>
    <Button round><Icon><MdFavorite /></Icon>️</Button>
    <Button round large><Icon><MdFavorite /></Icon>️</Button>
    <Button round outlined tiny><Icon><MdFavorite /></Icon>️</Button>
    <Button round outlined small><Icon><MdFavorite /></Icon>️</Button>
    <Button round outlined><Icon><MdFavorite /></Icon>️</Button>
    <Button round outlined large><Icon><MdFavorite /></Icon>️</Button>
    <span/>
  </Row>)
  .add('transparent', () => (
    <Container>
      <Row columns={4}>
        <Button round tiny transparent><Icon><MdFavorite /></Icon></Button>
        <Button round small transparent><Icon><MdFavorite /></Icon></Button>
        <Button round transparent><Icon><MdFavorite /></Icon></Button>
        <Button round large transparent><Icon><MdFavorite /></Icon></Button>
      </Row>
    </Container>
  ))
