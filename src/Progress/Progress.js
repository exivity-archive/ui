import React from 'react'
import PropTypes from 'prop-types'

const Progress = ({ progress }) => {
  const progressStyle = { width: progress + '%' }

  return (
    <div style={progressStyle}>
      {progress}
    </div>
  )
}

Progress.propTypes = {
  progress: PropTypes.number
}

Progress.defaultProps = {
  progress: 0
}

export default Progress
