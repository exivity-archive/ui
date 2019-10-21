import React from 'react'
import renderer from 'react-test-renderer'

import { Link } from '.'

test('renders an <a/> element', () => {
  const component = renderer.create(<Link />)

  expect(component.root.findByType('a')).toBeDefined()
})
