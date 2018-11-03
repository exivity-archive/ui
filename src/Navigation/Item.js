import PropTypes from 'prop-types'
import { styled, Box } from 'reakit'
import { theme } from 'styled-tools'

const Item = styled(Box.as('li'))`
  ${theme('NavigationItem')};
  
  list-style: none;
`

Item.propTypes = {
  ...Box.propTypes,
  children: PropTypes.node
}

Item.defaultProps = {}

Item.displayName = 'Navigation.Item'

export default Item
