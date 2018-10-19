import PropTypes from 'prop-types'
import { styled, List } from 'reakit'

import Slide from '../Slide'

const Hidden = styled(Slide.as(List))``

Hidden.propTypes = {
  ...Slide.propTypes,

  children: PropTypes.node
}

Hidden.defaultProps = {
  ...Slide.defaultProps
}

Hidden.displayName = 'Navigation.Hidden'

export default Hidden
