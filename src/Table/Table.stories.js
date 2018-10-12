import React from 'react'
import { storiesOf } from '@storybook/react'

import Code from '../Code'
import Table from './Table'

const TableContents = () => <React.Fragment>
  <thead>
    <tr>
      <th>component</th>
      <th>dependency</th>
      <th>version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><Code>CodeBlock</Code></td>
      <td>react-syntax-highlighter</td>
      <td>^9.0.0</td>
    </tr>
    <tr>
      <td><Code>Markdown</Code></td>
      <td>react-markdown</td>
      <td>^4.0.3</td>
    </tr>
  </tbody>
</React.Fragment>

storiesOf('atoms|Table', module)
  .add('default', () => <Table><TableContents /></Table>)
  .add('sizes', () => <div>
    <p>Mini</p>
    <Table mini><TableContents /></Table>
    <p>Small</p>
    <Table small><TableContents /></Table>
    <p>Normal</p>
    <Table><TableContents /></Table>
  </div>)
