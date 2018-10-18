import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'reakit'

import baseCss from './base'
import normalizeCss from './normalize'
import renderFont from './font'
import scrollbarCss from './scrollbar'

const Global = ({ base, normalize, font, scrollbar }) => {
  return <React.Fragment>
    {font && renderFont()}
    <style>{css`
    ${base ? baseCss : ''}
    ${normalize ? normalizeCss : ''}
    ${scrollbar ? scrollbarCss : ''}
  `}</style>
  </React.Fragment>
}

Global.propTypes = {
  base: PropTypes.bool,
  normalize: PropTypes.bool,
  font: PropTypes.bool,
  scrollbar: PropTypes.bool
}

Global.defaultProps = {
  base: true
}

export default Global

// @todo Global uses theme directly, instead of Provider.
// @todo To fix, after upgrade to styled-components 4, use this:
// import { createGlobalStyle } from 'styled-components'
// const Global = createGlobalStyle`${normalize} ${base} ${type}`
