import React from 'react'
import { shallow } from 'enzyme'

import ExpandableSpacer from './ExpandableSpacer'
import { ExpandableItem } from '../useExpandable'
import { distanceBetweenEvenLevelItem } from './helpers'

test('it renders', () => {
  const data: ExpandableItem<any> = []
  shallow(
    <ExpandableSpacer
      length={data.length}
      index={0}
      distance={distanceBetweenEvenLevelItem(data, 0)}
      level={1} />
  )
})

test('it renders with button', () => {
  const data: ExpandableItem<any> = []
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
