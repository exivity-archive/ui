/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import withEnumProps from './withEnumProps'

test('renders default WrappedComponent', () => {
  const WithEnumProps = withEnumProps(React.Fragment)
  const component = renderer.create(<WithEnumProps />)
  expect(component.toJSON()).toMatchSnapshot()
})
