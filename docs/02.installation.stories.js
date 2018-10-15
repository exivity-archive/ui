import React from 'react'
import { Heading, Paragraph, Link } from 'reakit'
import { storiesOf } from '@storybook/react'

import CodeBlock from '../src/CodeBlock'
import Code from '../src/Code'
import Table from '../src/Table'

import { maxWidth } from './utils'

storiesOf('Docs', module)
  .addDecorator(maxWidth)
  .add('Installation', () => <div>
    <Heading>Installation</Heading>
    <Paragraph>With <Code>yarn</Code>:</Paragraph>
    <CodeBlock>
      {`yarn add @exivity/ui`}
    </CodeBlock>
    <Paragraph>With <Code>npm</Code>:</Paragraph>
    <CodeBlock>
      {`npm i @exivity/ui`}
    </CodeBlock>

    <Heading>Dependencies</Heading>
    <Heading as='h2'>Direct dependencies</Heading>
    <Paragraph>The following packages will be automatically installed:</Paragraph>
    <Table>
      <thead>
        <tr>
          <th>dependency</th>
          <th>version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Link href='https://www.npmjs.com/package/color'>color</Link></td>
          <td>^3.1.0</td>
        </tr>
        <tr>
          <td><Link href='https://www.npmjs.com/package/reakit'>reakit</Link></td>
          <td>^0.15.7</td>
        </tr>
        <tr>
          <td><Link href='https://www.npmjs.com/package/styled-tools'>styled-tools</Link></td>
          <td>^1.5.1</td>
        </tr>
      </tbody>
    </Table>
    <Heading as='h2'>Peer dependencies</Heading>
    <Paragraph>The following packages must be already installed in your project:</Paragraph>
    <Table>
      <thead>
        <tr>
          <th>dependency</th>
          <th>version</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><Link href='https://www.npmjs.com/package/react'>react</Link></td>
          <td>^16.5.2</td>
        </tr>
        <tr>
          <td><Link href='https://www.npmjs.com/package/react-dom'>react-dom</Link></td>
          <td>^16.5.2</td>
        </tr>
      </tbody>
    </Table>
    <Heading as='h2'>Optional dependencies</Heading>
    <Paragraph>The following packages may be installed in your project if you plan to use the following components:</Paragraph>
    <Table>
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
          <td><Link href='https://www.npmjs.com/package/react-syntax-highlighter'>react-syntax-highlighter</Link></td>
          <td>^9.0.0</td>
        </tr>
        <tr>
          <td><Code>Markdown</Code></td>
          <td><Link href='https://www.npmjs.com/package/react-markdown'>react-markdown</Link></td>
          <td>^4.0.3</td>
        </tr>
      </tbody>
    </Table>
  </div>)
