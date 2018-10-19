import PropTypes from 'prop-types'
import { styled, keyframes, Hidden as BaseHidden } from 'reakit'
import { prop } from 'styled-tools'

const bounce = keyframes`
  0%, 50%, 75%, 87.5%, 100% { transform: translateY(0) }
  30% { transform: translateY(-100%) }
  65% { transform: translateY(-50%) }
  82.5% { transform: translateY(-25%) }
`

const rotateAndSlide = keyframes`
  0% { transform: none }
  50% { transform: rotateZ(180deg) }
  100% { transform: rotateZ(180deg) translateX(1000%) }
`

const Hidden = styled(BaseHidden)`
  background: palevioletred;
  width: 20px;
  height: 20px;
  margin: 10px;
  &[aria-hidden="false"] {
    animation: ${bounce} ${prop('duration')};
  }
  &[aria-hidden="true"] {
    animation: ${rotateAndSlide} ${prop('duration')};
  }
`

Hidden.propTypes = {
  ...BaseHidden.propTypes,
  children: PropTypes.node
}

Hidden.defaultProps = {}

Hidden.displayName = 'Navigation.Hidden'

export default Hidden
