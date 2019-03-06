import React from 'react'
import { shallow } from 'enzyme'

import ExpandableSpacer from './ExpandableSpacer'
import { ExpandableItem } from '../useExpandable'
import { distanceBetweenEvenLevelItem } from './helpers'

interface IItem {
  attributes: { level: number },
  [key: string]: any
}

test('it renders', () => {
  const data: ExpandableItem<IItem>[] = [{
    attributes: { level: 1 },
    expand: () => { return },
    expanded: true,
    index: 0,
    key: 'hi'
  }]
  shallow(
    <ExpandableSpacer
      length={data.length}
      index={data[0].index}
      distance={distanceBetweenEvenLevelItem(data, 0)}
      level={1} />
  )
})

test('it renders with button', () => {
  const data: ExpandableItem<IItem>[] = []
  shallow(
    <ExpandableSpacer
      length={data.length}
      index={0}
      distance={distanceBetweenEvenLevelItem(data, 0)}
      level={1}
      button={<button />}
    />
  )
})
