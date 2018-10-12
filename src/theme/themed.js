import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from 'styled-components'

import { defaultTheme } from '.'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

function themed (WrappedComponent) {
  WrappedComponent.propTypes = {
    ...WrappedComponent.propTypes || {},
    theme: PropTypes.object.isRequired
  }

  class Themed extends React.Component {
    render () {
      return <ThemeConsumer>
        {theme => <WrappedComponent {...this.props} theme={{
          ...defaultTheme,
          ...theme,
          ...this.props.theme
        }} />}
      </ThemeConsumer>
    }
  }

  Themed.displayName = getDisplayName(WrappedComponent)

  return Themed
}

export default themed
