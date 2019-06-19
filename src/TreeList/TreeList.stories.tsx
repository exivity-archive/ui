import React from 'react'
import { storiesOf } from '@storybook/react'

import { TreeList } from './TreeList'
import { LONG_LIST } from './stories/seed'

const parentKeyAccessor = () => 'hi'

storiesOf('organisms|TreeList', module)
  .add('default', () => <TreeList data={LONG_LIST} parentKeyAccessor={parentKeyAccessor} />)
