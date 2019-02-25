
import * as React from 'react'
import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import WebfontLoader from '@dr-kobros/react-webfont-loader'

import theme from '../src/theme'
import { fontConfig } from '../src/fontConfig'


const styles = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}

const CenterDecorator = (storyFn) => (
  <div style={styles}>
    { storyFn() }
  </div>
)

const FontLoader = (storyFn) => (
  <WebfontLoader config={fontConfig} onStatus={(fontStatus) => console.log('font status:', fontStatus)}>
    { storyFn() }
  </WebfontLoader>
)

const themes = [theme]
addDecorator(withThemesProvider(themes))
addDecorator(FontLoader)
addDecorator(CenterDecorator)


function loadStories() {
  require('../src/stories')
}

configure(loadStories, module)