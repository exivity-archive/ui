import PropTypes from 'prop-types'
import { Box, Tabs as BaseTabs, styled } from 'reakit'

const Tabs = styled(BaseTabs)``

Tabs.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node
}

Tabs.defaultProps = {
  palette: 'grayscale',
  tone: 2
}

Tabs.displayName = 'Tab'

export default Tabs
