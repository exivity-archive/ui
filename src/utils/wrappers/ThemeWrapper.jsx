import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'

class ThemeWrapper extends React.Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}

export default ThemeWrapper
