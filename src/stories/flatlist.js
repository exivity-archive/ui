import React from 'react'
import Faker from 'faker'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import List, { Row } from '../components/molecules/List'
import { useBuildTree } from '../components/molecules/List/extensions/Expandable'

const lvl1 = new Array(100).fill(null)
  .map((item, index) => ({
    key: index + 1,
    value: Faker.name.firstName(),
    attributes: {
      level: 1,
    },
    parent: null,
    children: []
  }))

const lvl2 = new Array(200).fill(null)
  .map((item, index) => {
    if (index > 99) {
      return {
        key: index + 101,
        value: Faker.name.firstName(),
        attributes: {
          level: 2,
        },
        parent: index - 99,
        children: []
      }
    } else {
        return {
          key: index + 101,
          value: Faker.name.firstName(),
          attributes: {
            level: 2,
          },
          parent: index + 1,
          children: []
        }
      }
    })

const lvl3  = new Array(600).fill(null)
  .map((item, index) => {
    if (index > 299) {
      return {
        key: index + 301,
        value: Faker.name.firstName(),
        attributes: {
          level: 3,
        },
        parent: index - 200,
        children: []
      }
    } else {
      return {
        key: index + 301,
        value: Faker.name.firstName(),
        attributes: {
          level: 3,
        },
        parent: index + 101,
        children: []
      }
    }
  })

const testData = lvl1.concat(lvl2).concat(lvl3)

export default storiesOf('List', module)
  .add('default', () =>  (
    <List height={400} width={400} data={testData} itemSize={50}>
      {Row}
    </List>
  ))
  .add('nested', () =>  (
      <List height={400} width={400} data={testData} itemSize={50}>
        {Test}
      </List>
    ))

const Test = ({ data, index, style }) => {
  const item = data[index]

  return (
    <div onClick={item.onClick} style={style}>
      {item.children.length ? 'expandable ' + String(item.value) : String(item.value)}
    </div>
  )
}