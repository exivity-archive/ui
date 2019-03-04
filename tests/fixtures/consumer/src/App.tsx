import React, { Component, useState } from 'react'
import ThemeAndFontProvider from '@exivity/ui/ThemeProvider'
import TextInput from '@exivity/ui/TextInput'

class App extends Component {
  render () {
    const [name, setName] = useState('')
    return (
      <ThemeAndFontProvider>
        <TextInput value={name} onChange={setName}/>
      </ThemeAndFontProvider>
    )
  }
}

export default App
