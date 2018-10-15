import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'

import normalizeCss from './normalize'
import typeCss from './type'

let injected = false

const Global = ({ normalize, type }) => {
  if (!injected) {
    injectGlobal`${normalize && normalizeCss} ${type && typeCss}`
    injected = true
  }

  return null
}

Global.propTypes = {
  normalize: PropTypes.bool,
  type: PropTypes.bool
}

Global.defaultProps = {
  normalize: true,
  type: true
}

export default Global

// @todo after upgrade to styled-components 4, use this:
// import { createGlobalStyle } from 'styled-components'
// const Global = createGlobalStyle`${normalize} ${base} ${type}`
