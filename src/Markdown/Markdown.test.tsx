import { readFileSync } from 'fs'
import { resolve } from 'path'

import React from 'react'
import renderer from 'react-test-renderer'

import { Markdown } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const sample = readFileSync(resolve(__dirname, '../utils/stories/samples/markdown.md')).toString()

test('renders Markdown with sample content', () => {
  const component = renderer.create(<Markdown>{sample}</Markdown>)

  expect(component.toJSON()).toMatchSnapshot()
})
