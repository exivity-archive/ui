import React from 'react'
import PropTypes from 'prop-types'
import { Provider as BaseProvider, css } from 'reakit'

import FontProvider from './FontProvider'

import baseCss from './base'
import normalizeCss from './normalize'
import scrollbarCss from './scrollbar'

const Provider = ({
  children,
  base,
  normalize,
  font,
  scrollbar,
  ...otherProps
}) => {
  return <BaseProvider {...otherProps}>
    <React.Fragment>
      <style>
        {css`
          ${base ? baseCss : ''}
          ${normalize ? normalizeCss : ''}
          ${scrollbar ? scrollbarCss : ''}
        `}
      </style>
      {font ? <FontProvider>{children}</FontProvider> : children}
    </React.Fragment>
  </BaseProvider>
}

Provider.propTypes = {
  ...BaseProvider.propTypes,
  base: PropTypes.bool,
  normalize: PropTypes.bool,
  font: PropTypes.bool,
  scrollbar: PropTypes.bool
}

Provider.defaultProps = {
  base: true
}

export default Provider

// @todo Provider uses theme directly, instead of through BaseProvider.
// @todo To fix, after upgrade to styled-components 4, use this:
// import { createGlobalStyle } from 'styled-components'
// const Provider = createGlobalStyle`${normalize} ${base} ${type}`
