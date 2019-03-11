import React from 'react'
import { FixedSizeList } from 'react-window'

// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { storeAndAction } from '../utils/tests/storeAndAction'
import { useSelectable } from '.'
import { Row } from '../utils/stories/components'
import { mockFn } from '../utils/stories/mocks'
import { FLAT_LIST_TEST_DATA } from '../useExpandable/stories/seed'

const SelectableList = () => {
  const [selected, Item] = useSelectable()

  return (
    <FixedSizeList height={600} width={400} itemSize={50} itemData={FLAT_LIST_TEST_DATA} itemCount={FLAT_LIST_TEST_DATA.length}>
      {Item}
    </FixedSizeList>
  )
}

storiesOf('helpers|useSelectable', module)
  .addDecorator(withState(''))
  .add('default', ({ state, storeState }: any) => <SelectableList/>)
