/* eslint-disable no-undef */
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import { SIZE_LARGE } from '../theme'
import WithStyle from '../WithStyle'

import Button from './Button'

test('renders basic button', () => {
  const button = renderer.create(<Button>click</Button>)
  expect(button.toJSON()).toMatchSnapshot()
})

test('renders large button', () => {
  const largeButton1 = renderer.create(<Button large>click</Button>)
  expect(largeButton1.toJSON()).toMatchSnapshot()
})
