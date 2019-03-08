import React from 'react'
// @ts-ignore
import { storiesOf } from '@storybook/react'
import { withState } from '../utils/tests/decorators/StateDecorator'
import { Dropdown } from '.'

import { loremIpsum } from '../utils/loremIpsum'

storiesOf('molecules|Dropdown', module)
  .addDecorator(withState(false))
  .add('default', ({ state, storeState }: any) => {
    return (
      <div style={{ padding: '300px 0' }}>
        <Dropdown
          open={state}
          triggerComponent={
            <div onClick={() => storeState(!state)}>Click me</div>
          }>
          <div style={{ width: 500 }}>
            {loremIpsum}
          </div>
        </Dropdown>
      </div>
    )
  })
