import React from 'react'
import { Provider, Box } from "reakit"

import { addDecorator, configure } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { withOptions } from '@storybook/addon-options'

import theme from '../src/theme'
import Global from '../src/Global'

const options = {
  name: '@exivity/ui',
  url: 'https://github.com/exivity/ui',
  showAddonPanel: true,
  addonPanelInRight: true,
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
}
export const withStyle = story => <Provider theme={theme}>
  <React.Fragment>
    <Global font />
    {story()}
  </React.Fragment>
</Provider>
export const withContainer = story => <Box
  padding={20}
  backgroundColor={theme.palette.grayscale[6]}>
  {story()}
  </Box>

// add decorators
addDecorator(withInfo)
addDecorator(withStyle)
addDecorator(withKnobs)
addDecorator(withOptions(options))
addDecorator(withContainer)

// automatically import all files ending in *.stories.js
const req = require.context('..', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
