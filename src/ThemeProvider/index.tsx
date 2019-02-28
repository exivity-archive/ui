import React from 'react'
import { ThemeProvider } from 'styled-components'
// @ts-ignore
import WebfontLoader from '@dr-kobros/react-webfont-loader'

import { fontConfig } from '../fontConfig'
import mainTheme, { Theme } from '../theme'

interface ThemeAndFontProviderProps {
  fontsConfig?: object
  theme?: Theme
  onFontStatus?: (status: string) => void
  children: any
}

export const ThemeAndFontProvider: React.FC<ThemeAndFontProviderProps> = ({
    fontsConfig = fontConfig,
    theme = mainTheme,
    onFontStatus,
    children
}) => (
    <ThemeProvider theme={theme}>
        <WebfontLoader config={fontsConfig} onStatus={onFontStatus && onFontStatus}>
            { children }
        </WebfontLoader>
    </ThemeProvider>
)

export default ThemeAndFontProvider
