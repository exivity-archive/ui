import React, { Component, useState } from 'react'
import { ThemeProvider, Input } from '@exivity/ui'

class App extends Component {
  render () {
    const [name, setName] = useState('')
    return (
      <ThemeProvider>
        <Input value={name} onChange={setName} />
      </ThemeProvider>
    )
  }
}

export default App
