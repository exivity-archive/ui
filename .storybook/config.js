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

function loadStories() {
  require('../src/stories')
}
configure(loadStories, module)