import { FlexDirectionProperty } from 'csstype'
import * as React from 'react'

const styles = {
  display: 'flex',
  height: '100%',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as FlexDirectionProperty
}

export const CenterDecorator = (storyFn: any) => (
  <div style={styles}>
    <div>
      {storyFn()}
    </div>
  </div>
)
