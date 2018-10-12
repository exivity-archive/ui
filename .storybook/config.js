import React from 'react'
import styled from 'styled-components'

import { addDecorator, configure } from '@storybook/react'
import { select, color, withKnobs } from '@storybook/addon-knobs'
import { withInfo } from '@storybook/addon-info'
import { withOptions } from '@storybook/addon-options'

import WithStyle from '../src/WithStyle'
import defaultTheme from '../src/theme/defaultTheme'
import * as themeConstants from '../src/theme/constants'

const withStyle = story => {
  const theme = {
    ...defaultTheme,
    size: select('Base size', {
      small: themeConstants.SIZE_SMALL,
      default: themeConstants.SIZE_DEFAULT,
      large: themeConstants.SIZE_LARGE
    }, defaultTheme.size, 'Size'),
    spacing: select('Spacing', {
      compact: themeConstants.SPACING_COMPACT,
      small: themeConstants.SPACING_SMALL,
      default: themeConstants.SPACING_DEFAULT,
    }, defaultTheme.spacing, 'Size'),
    colours: {
      bg: color('Background', defaultTheme.colours.bg, 'colours'),
      text: color('Text', defaultTheme.colours.text, 'colours'),
      primary: color('Primary', defaultTheme.colours.primary, 'colours'),
      danger: color('Danger', defaultTheme.colours.danger, 'colours'),
      warning: color('Warning', defaultTheme.colours.warning, 'colours'),
      success: color('Success', defaultTheme.colours.success, 'colours'),
      mark: color('Marker', defaultTheme.colours.mark, 'colours'),
    }
  }

  return <WithStyle theme={theme}>
    {story()}
  </WithStyle>
}

const options = {
  name: '@exivity/ui',
  url: 'https://github.com/exivity/ui',
  showAddonPanel: true,
  addonPanelInRight: true,
  hierarchySeparator: /\/|\./,
  hierarchyRootSeparator: /\|/,
}

const Container = styled.div`
  padding: 20px;
  
  h1:first-child {
    margin-top: 0;
  }
`
const withContainer = story => <Container>
  {story()}
</Container>

// add decorators
addDecorator(withInfo)
addDecorator(withStyle)
addDecorator(withKnobs)
addDecorator(withOptions(options))
addDecorator(withContainer)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
