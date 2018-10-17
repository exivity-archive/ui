import React from 'react'
import { Divider } from 'reakit'
import { storiesOf } from '@storybook/react'

import Code from '../Code'
import Table from './Table'

const SimpleTableContents = () => <React.Fragment>
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
</React.Fragment>

storiesOf('atoms|Table', module)
  .add('default', () => <Table>
    <React.Fragment>
      <caption>Table caption</caption>
      <thead>
        <tr>
          <th>Component</th>
          <th>Dependency</th>
          <th>Version</th>
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
      <tfoot>
        <tr>
          <td colSpan={3}>I'm at the bottom because I'm a <Code>tfoot</Code>.</td>
        </tr>
      </tfoot>
    </React.Fragment>
  </Table>)
  .add('scale', () => <React.Fragment>
    <Table xsmall><SimpleTableContents /></Table>
    <Divider />
    <Table small><SimpleTableContents /></Table>
    <Divider />
    <Table><SimpleTableContents /></Table>
    <Divider />
    <Table large><SimpleTableContents /></Table>
    <Divider />
    <Table xlarge><SimpleTableContents /></Table>
  </React.Fragment>)
  .add('compact', () => <div>
    <Table xsmall compact><SimpleTableContents /></Table>
    <Divider />
    <Table small compact><SimpleTableContents /></Table>
    <Divider />
    <Table compact><SimpleTableContents /></Table>
    <Divider />
    <Table large compact><SimpleTableContents /></Table>
    <Divider />
    <Table xlarge compact><SimpleTableContents /></Table>
  </div>)
