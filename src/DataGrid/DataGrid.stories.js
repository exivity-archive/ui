import React from 'react'
import { storiesOf } from '@storybook/react'

import { createRandomizedData } from './stories/utils'

import DataGrid from './DataGrid'

const data = createRandomizedData()

storiesOf('organism|DataGrid', module)
  .add('default', () => <DataGrid data={data} />)
