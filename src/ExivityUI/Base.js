import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'

const Base = ({ theme }) => <style>{`
body {
  background-color: ${theme.colours.primary};
}
`}</style>

Base.propTypes = {
  theme: PropTypes.object.isRequired
}

export default withTheme(Base)
