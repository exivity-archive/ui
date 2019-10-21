import React from 'react'

import { StateContainer } from '../StateContainer'

export const withState = (initialState: any = null) => (storyFunc: any, context: any) => (
  <StateContainer initialState={initialState}>
    {(state: any, storeState: any) => {
      context.state = state
      context.storeState = storeState
      return storyFunc()
    }}
  </StateContainer>
)
