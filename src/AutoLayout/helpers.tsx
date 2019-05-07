import React from 'react'

export function getHighestHeight (children: any) {
  let highest = 0
  React.Children.forEach(children, (child) => {
    if (child.props.height > highest || child.props.minHeight > highest) {
      highest = child.props.height || child.props.minHeight
    }
  })
  return highest
}
