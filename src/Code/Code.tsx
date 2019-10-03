import React, { ReactNode, useEffect, useState } from 'react'
import { SyntaxHighlighterProps } from 'react-syntax-highlighter'
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light'
// @ts-ignore
import solarizedlight from 'react-syntax-highlighter/dist/cjs/styles/prism/solarizedlight'
import styled, { css } from 'styled-components'

import { SectionProps, fromTheme } from '../utils/styled'
import { preciseEm } from '../utils/styled/isolated'

interface CodeProps extends SyntaxHighlighterProps {
  language?: string
  block?: boolean
  showLineNumbers?: boolean
  children?: ReactNode
}

const useDynamicLanguage = (language: string) => {
  // Set initial state to a boolean indicating whether the language is text
  // (in which case we can skip the dynamic import effect)
  const [current, setCurrent] = useState('text')

  useEffect(() => {
    if (language !== 'text') {
      import(`react-syntax-highlighter/dist/cjs/languages/prism/${language}`)
        .then(definition => {
          SyntaxHighlighter.registerLanguage(language, definition.default)
          setCurrent(language)
        })
        .catch(() => {
          console.error(`Language '${language}' could not be found, falling back to plaintext`)
          setCurrent('text')
        })
    }
  }, [language])

  return current
}

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  // Override globalBlockSpacing because we need !important
  margin: ${(props: SectionProps) => props.noMargin ? 0 : preciseEm(1)}rem 0 !important;

  &:first-child {
    margin-top: 0 !important;
  }

  &:last-child {
    margin-bottom: 0 !important;
  }

  & {
    background-color: ${fromTheme(theme => theme.colors.lightGray)} !important;
    &, code, pre {
      font-family: ${fromTheme(theme => theme.global.fontFamilyMonospace)} !important;
    }

    padding: ${props => props.PreTag === 'span'
    ? css`${fromTheme(theme => theme.global.baseSpacing / 4)}`
    : css`${fromTheme(theme => theme.global.baseSpacing)}`}em !important;
  }
`

export function Code ({
  children,
  block,
  showLineNumbers,
  language = 'text'
}: CodeProps & SectionProps) {
  const highlighterLanguage = useDynamicLanguage(language)

  return (
    <StyledSyntaxHighlighter
      PreTag={block ? 'pre' : 'span'}
      style={solarizedlight}
      language={highlighterLanguage}
      showLineNumbers={showLineNumbers}
    >
      {children}
    </StyledSyntaxHighlighter>
  )
}
