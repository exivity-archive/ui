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

export const BackgroundColorDecorator = (color?: string) => (storyFn: any) => (
  <div style={{ backgroundColor: color || '#f4f4f4', ...styles }}>
    {storyFn()}
  </div>
)
