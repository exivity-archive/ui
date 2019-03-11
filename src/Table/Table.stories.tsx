// @ts-ignore
import { storiesOf } from '@storybook/react'
import React from 'react'

import { Table } from '.'

const Sample = () => <>
  <caption align='bottom'>Table caption</caption>
  <thead>
  <tr>
    <th>Component</th>
    <th>Dependency</th>
    <th>Version</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>CodeBlock</td>
    <td>react-syntax-highlighter</td>
    <td>^9.0.0</td>
  </tr>
  <tr>
    <td>Markdown</td>
    <td>react-markdown</td>
    <td>^4.0.3</td>
  </tr>
  </tbody>
</>

storiesOf('atoms|Table', module)
  .add('default', () => <Table><Sample /></Table>)
  .add('compact', () => <Table compact><Sample /></Table>)
