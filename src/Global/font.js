import React from 'react'
import WebfontLoader from '@dr-kobros/react-webfont-loader'

import theme from '../theme'

const renderFont = () => {
  return <WebfontLoader config={theme.type.fonts.config} />
}

export default renderFont
