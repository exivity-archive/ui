import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import theme from '../src/theme'


const themes = [theme]
addDecorator(withThemesProvider(themes))

function loadStories() {
  require('../src/stories')
}
configure(loadStories, module)