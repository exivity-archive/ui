import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'
import { FontLoader } from '../src/decorators/FontLoader'
import { CenterDecorator } from '../src/decorators/CenterDecorator'
import theme from '../src/theme'

const themes = [theme]
addDecorator(CenterDecorator)
addDecorator(withThemesProvider(themes))
addDecorator(FontLoader)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
