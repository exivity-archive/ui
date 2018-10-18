import React from 'react'
import { storiesOf } from '@storybook/react'

import { createRandomizedData } from './stories/utils'

import DataGrid from './DataGrid'

const data = createRandomizedData()

storiesOf('molecules|DataGrid', module)
  .add('default', () => <DataGrid data={data} />)
