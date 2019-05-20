Usage
=====

Start using **exivity/ui** by importing any named export from the main package. Most components also export a TypeScript props type:

```javascript
import { Block, BlockProps } from '@exivity/ui' 
```

Theming
-------

### ThemeProvider

Wrap your entire app in a `ThemeProvider` from [styled-components](https://www.styled-components.com/docs/advanced#theming) to provide theming capabilities to all nested components. **@exivity/ui** ships with a default theme which all components use if no `ThemeProvider` is found in the render tree.

```javascript
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@exivity/ui'
```

```jsx
function render () {
  const myTheme = {
    ...lightTheme,
    global: {
      ...lightTheme.global,
      fontFamily: 'monospace',
      purposes: {
        ...lightTheme.global.purposes,
        primary: 'hotpink'
      }
    }
  }
  
  return <ThemeProvider theme={myTheme}>
    <Button>Pink and monospaced</Button>
  </ThemeProvider>
}
```

### Using local fonts

_wip_
