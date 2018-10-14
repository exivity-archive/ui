// @todo remove ThemeConsumer ponyfill when upgrading to styled-components v4

import React from 'react'
import PropTypes from 'prop-types'

class ThemeConsumer extends React.Component {
  render () {
    return this.props.children(this.context['__styled-components__next__'].getTheme())
  }
}

ThemeConsumer.propTypes = {
  children: PropTypes.func.isRequired
}

ThemeConsumer.contextTypes = {
  '__styled-components__next__': PropTypes.shape({
    getTheme: PropTypes.func,
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func
  })
}

function withEnumProps (WrappedComponent, enumProps) {
  class WithEnumProps extends React.Component {
    render () {
      return <ThemeConsumer>
        {theme => {
          const compactedProps = {}
          Object.keys(enumProps).forEach(enumProp => {
            if (enumProps[enumProp] === 'key') {
              compactedProps[enumProp] = Object.keys(theme[enumProp])
                .find(key => this.props[key])
            } else if (enumProps[enumProp] === 'value') {
              const match = Object.entries(theme[enumProp])
                .find(entry => this.props[entry[0]])
              compactedProps[enumProp] = match && match[1]
            } else {
              throw new Error('Invalid configuration')
            }
          })

          return <WrappedComponent {...this.props} {...compactedProps} />
        }}
      </ThemeConsumer>
    }
  }

  WithEnumProps.propTypes = WrappedComponent.propTypes || {}
  WithEnumProps.defaultProps = WrappedComponent.defaultProps || {}
  WithEnumProps.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  return WithEnumProps
}

export default withEnumProps
