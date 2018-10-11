import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import normalize from '../theme/normalize'
import base from '../theme/base'
import defaultTheme from '../theme/defaultTheme'

const GlobalStyle = createGlobalStyle`${normalize} ${base}`

const WithStyle = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)

WithStyle.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
}

WithStyle.defaultProps = {
  theme: defaultTheme
}

export default WithStyle
