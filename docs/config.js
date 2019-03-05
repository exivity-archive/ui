import { addDecorator, configure } from '@storybook/react'
import { CanvasDecorator } from '../tests/utils/decorators/CanvasDecorator'
import { ThemeDecorator } from '../tests/utils/decorators/ThemeDecorator'

addDecorator(CanvasDecorator)
addDecorator(ThemeDecorator)

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.(js|tsx)$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
