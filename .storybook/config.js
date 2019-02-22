import  React from 'react'
import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import theme from '../src/theme'

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
);
const themes = [theme]
addDecorator(withThemesProvider(themes))
addDecorator(CenterDecorator)
function loadStories() {
  require('../src/stories')
}
configure(loadStories, module)