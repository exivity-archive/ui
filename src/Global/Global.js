import { injectGlobal } from 'styled-components'

import normalize from './normalize'
import type from './type'

let injected = false

const Global = () => {
  if (!injected) {
    injectGlobal`${normalize} ${type}`
    injected = true
  }

  return null
}

export default Global

// @todo after upgrade to styled-components 4, use this:
// import { createGlobalStyle } from 'styled-components'
// const Global = createGlobalStyle`${normalize} ${base} ${type}`
