import * as React from 'react'

import Widget from '.'
import { shallow } from 'enzyme'

test('Widget snapshot', () => {
  const widget = shallow(<Widget title='Widget title' subTitle='Widget subTitle'>Widget</Widget>)
  expect(widget).toMatchSnapshot()
})
