import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { MdClear, MdCloud, MdFavorite, MdSave, MdWhatshot } from 'react-icons/md'
import styled, { css } from 'styled-components'

import { Icon } from '../Icon'
import { Button } from '.'

const Row = styled.div<{ columns?: number | false }>`
  display: grid;
  grid-gap: 20px;
  ${props => props.columns !== false && css`
    grid-template-columns: repeat(${props => props.columns || 10}, fit-content(200px));
  `}
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
    <Button tiny>Tiny</Button>
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
