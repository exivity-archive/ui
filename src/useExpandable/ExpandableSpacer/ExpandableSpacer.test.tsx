import React from 'react'
import { shallow } from 'enzyme'

import { ExpandableSpacer } from './ExpandableSpacer'
import { distanceBetweenEvenLevelItem } from './helpers'

interface Data {
  attributes: { level: number },
  [key: string]: any
}

test('it renders', () => {
  const data: Data[] = [{
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
  const data: Data[] = []
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
