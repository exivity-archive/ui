import React from 'react'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { ListFocus } from './ListFocus'
import { ListItem } from '../ListItem'

const style = {
  height: 30
}

const styleText = {
  height: 30,
  display: 'flex',
  alignItems: 'center'
}

const list = {
  padding: 0,
  margin: 0
}

export default storiesOf('atoms/ListFocus', module)
  .add('list focus', () => (
    <ListFocus>
        <ul style={list}>
          <ListItem style={style}><div style={styleText}>onHover focus element</div></ListItem>
          <ListItem style={style}><div style={styleText}>Key down</div></ListItem>
          <ListItem style={style}><div style={styleText}>or up</div></ListItem>
          <ListItem style={style}><div style={styleText}>to shift</div></ListItem>
        </ul>
    </ListFocus>
  ))
