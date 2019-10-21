import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
// @ts-ignore
import WebfontLoader from '@dr-kobros/react-webfont-loader'

import { defaultTheme, Theme } from '../themes'

interface ThemeProviderProps {
  theme?: Theme
  onFontStatus?: (status: string) => void
  children?: any
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTheme,
  onFontStatus,
  children
}) => (
  <StyledThemeProvider theme={theme}>
    <WebfontLoader config={theme.fonts} onStatus={onFontStatus && onFontStatus}>
      {children}
    </WebfontLoader>
  </StyledThemeProvider>
)
