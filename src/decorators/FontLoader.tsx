import * as React from 'react'
// @ts-ignore
import WebfontLoader from '@dr-kobros/react-webfont-loader'

import { fontConfig } from '../fontConfig'

export const FontLoader = (storyFn: any) => (
  <WebfontLoader config={fontConfig} onStatus={(fontStatus: string) => console.log('font status:', fontStatus)}>
    { storyFn() }
  </WebfontLoader>
)
