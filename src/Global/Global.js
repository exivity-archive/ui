import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'

import normalizeCss from './normalize'
import typeCss from './type'
import scrollbarCss from './scrollbar'

let injected = false

const Global = ({ normalize, type, scrollbar }) => {
  if (!injected) {
    injectGlobal`
      ${normalize && normalizeCss}
      ${type && typeCss}
      ${scrollbar && scrollbarCss}`
    injected = true
  }

  return null
}

Global.propTypes = {
  normalize: PropTypes.bool,
  type: PropTypes.bool,
  scrollbar: PropTypes.bool
}

Global.defaultProps = {
  normalize: true,
  type: true,
  scrollbar: true
}

export default Global

// @todo after upgrade to styled-components 4, use this:
// import { createGlobalStyle } from 'styled-components'
// const Global = createGlobalStyle`${normalize} ${base} ${type}`
