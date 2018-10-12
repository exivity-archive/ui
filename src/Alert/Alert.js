import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'reakit'

const Alert = ({ children }) => <Box padding={20}>{children}</Box>

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool
}

export default Alert
