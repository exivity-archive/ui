/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'

import {Component} from './{Component}'

test('renders default {Component}', () => {
  const component = renderer.create(<{Component} />)
  expect(component.toJSON()).toMatchSnapshot()
})
