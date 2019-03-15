Usage
Theme provider
Wrap your entire app in a Provider component from reakit to provide styling capabilities to all nested components and use the provided theme:

import { Provider } from 'reakit'
import { theme } from '@exivity/ui'

<Provider theme={theme}>
  <App/>
</Provider>
Global styles
This package ships with the well-known normalize.css reset and a @import statement for loading the fonts for the default theme. Including those global styles is recommended but optional:

import { Provider, theme } from '@exivity/ui'

<Provider theme={theme} normalize font>
  <App/>
</Provider>
Using local fonts
...
