import PropTypes from 'prop-types'
import { styled, Box } from 'reakit'

const Item = styled(Box.as('li'))``

Item.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node
}

Item.defaultProps = {}

Item.displayName = 'Navigation.Item'

export default Item
