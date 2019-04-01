import React, { Component, useState } from 'react'
import { ThemeProvider, TextInput } from '@exivity/ui'

class App extends Component {
  render () {
    const [name, setName] = useState('')
    return (
      <ThemeProvider>
        <TextInput value={name} onChange={setName}/>
      </ThemeProvider>
    )
  }
}

export default App
