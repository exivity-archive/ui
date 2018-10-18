import React from 'react'

import propTypes, { defaultProps } from './propTypes'

const Container = ({ children, ...otherProps }) => {
  return React.Children.map(children, child => {
    return React.cloneElement(child, otherProps)
  })
}

Container.propTypes = propTypes

Container.defaultProps = defaultProps

Container.displayName = 'Field.Container'

export default Container
