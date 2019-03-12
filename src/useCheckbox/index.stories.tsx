import React from 'react'
import { FixedSizeList } from 'react-window'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import useCheckbox from '.'
import { FLAT_LIST_TEST_DATA } from '../useExpandable/stories/seed'

import { useExpandable } from '../useExpandable'
const getParent = (item) => item.parentId

const CheckableList = () => {
  const [data] = useExpandable(FLAT_LIST_TEST_DATA, getParent)
  const data1 = useCheckbox(data, 'checked')

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={[data]} itemCount={data.length}>
      {Item}
    </FixedSizeList>
  )
}

export default storiesOf('List hooks', module)
  .add('useCheckbox', () => <CheckableList />)

const Item = ({ data, index, style }: any) => {
  const [items, tree] = data
  const item = items[index]

  return (
    <div key={index} style={style}>
      {item.value}:
      {(item.attributes.level === 1 | item.attributes.level === 2) && <button onClick={item.expand}>expand</button>}
      <input type='checkbox' checked={item.checked} onChange={(e) => {
        item.check()
        action(`toggle checkbox for ${item.value}'`, e.target.checked)
      }
      }/>
    </div>
  )
}
