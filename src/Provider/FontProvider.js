import React from 'react'
import PropTypes from 'prop-types'
import WebfontLoader from '@dr-kobros/react-webfont-loader'
import { withTheme } from 'reakit'

const FontProvider = ({ theme, children }) => {
  return <WebfontLoader config={theme.type.fonts.config}>
    {children}
  </WebfontLoader>
}

FontProvider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object
}

export default withTheme(FontProvider)
