/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import Markdown from './Markdown'

test('renders default Markdown', () => {
  const component = renderer.create(<Markdown />)
  expect(component.toJSON()).toMatchSnapshot()
})
