import React from 'react'
import { storiesOf } from '@storybook/react'

import { createRandomizedData } from '../../docs/examples/list'

import DataGrid from './DataGrid'

const data = createRandomizedData()

storiesOf('molecules|DataGrid', module)
  .add('default', () => <DataGrid data={data} />)
