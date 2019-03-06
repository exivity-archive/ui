import React, { useState } from 'react'

interface StateContainerProps {
  initialState?: any
  children: any
}

export const StateContainer: React.FC<StateContainerProps> = ({ initialState = {}, children }) => {
  const [state, setState] = useState(initialState)

  return children(state, setState)
}
