import { addDecorator, configure } from '@storybook/react'
import { CenterDecorator } from '../src/utils/testing/decorators/CenterDecorator'
import { ThemeDecorator } from '../src/utils/testing/decorators/ThemeDecorator'

addDecorator(CenterDecorator)
addDecorator(ThemeDecorator)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
