import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'

import Normalize from './Normalize'
import Base from './Base'
import defaultTheme from './defaultTheme'

const WithStyle = ({ children, theme }) => <ThemeProvider theme={theme}>
  <Fragment>
    <Normalize />
    <Base />
    {children}
  </Fragment>
</ThemeProvider>

WithStyle.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
}

WithStyle.defaultProps = {
  theme: defaultTheme
}

export default WithStyle
