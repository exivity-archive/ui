import React from 'react'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import WebfontLoader from '@dr-kobros/react-webfont-loader'

import mainTheme, { Theme } from '../defaultTheme/theme'

interface ThemeAndFontProviderProps {
  theme?: Theme
  onFontStatus?: (status: string) => void
  children: any
}

export const ThemeAndFontProvider: React.FC<ThemeAndFontProviderProps> = ({
    theme = mainTheme,
    onFontStatus,
    children
}) => (
    <ThemeProvider theme={theme}>
        <WebfontLoader config={theme.fonts} onStatus={onFontStatus && onFontStatus}>
            { children }
        </WebfontLoader>
    </ThemeProvider>
)

export default ThemeAndFontProvider
