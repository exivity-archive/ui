// @ts-ignore
import theme from 'prism-react-renderer/themes/duotoneLight'
import React, { useState } from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import styled from 'styled-components'
import { ensureString } from '..'
import * as UI from '../..'
import { Alert } from '../../Alert'
import { Code } from '../../Code'
import { Markdown } from '../../Markdown'
import { Section } from '../../Section'
import { fromTheme } from '../styled'
import { preciseEm } from '../styled/isolated'
import { PropsTable } from './propsTable'

const globals = {
  useState,
  styled,
  ...UI
}

const StyledEditorWrapper = styled.div`
  &, textarea, pre {
    font-family: ${fromTheme(theme => theme.global.fontFamilyMonospace)} !important;
    font-weight: normal !important;
    font-size: ${fromTheme(theme => theme.global.baseSize)}px !important;
    line-height: ${fromTheme(theme => theme.global.lineHeight)} !important;
  }

  color: ${fromTheme(theme => theme.global.textColor)};
  background-color: ${fromTheme(theme => theme.colors.lightGray)};
  border: 1px solid ${fromTheme(theme => theme.colors.lightGray)};
  border-bottom: 0;
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px ${fromTheme(theme => theme.global.borderRadius)}px 0 0;

  padding: calc(${fromTheme(theme => theme.global.baseSpacing)}em - 10px) !important;

  textarea:focus {
    outline: none;
  }
`

const StyledEditor = styled(LiveEditor)<{ theme: any }>``

const StyledPreview = styled(LivePreview)`
  position: relative;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><g fill='#f7f7f7'><rect width='5' height='5' y='0' x='0'/><rect width='5' height='5' y='5' x='5'/></g></svg>");
  padding: ${preciseEm(1)}em;
  border: 1px solid ${fromTheme(theme => theme.colors.lightGray)};
  border-top: 0;
  border-radius: 0 0 ${fromTheme(theme => theme.global.borderRadius)}px ${fromTheme(theme => theme.global.borderRadius)}px;
  height: auto;
  overflow: hidden;
`

const StyledError = styled(Alert).attrs({
  danger: true
})<{ as: any }>`
  font-family: ${fromTheme(theme => theme.global.fontFamilyMonospace)};
  margin: 0;
  border-radius: 0;
`

const JsxRenderer = (props: any) => (
  <Section>
    <LiveProvider code={props.value} scope={globals}>
      <StyledEditorWrapper>
        <StyledEditor theme={theme} />
      </StyledEditorWrapper>
      <StyledError as={LiveError} />
      <StyledPreview />
    </LiveProvider>
  </Section>
)

const CodeRenderer = (props: any) => (
  props.language === 'jsx'
    ? <JsxRenderer {...props} />
    : <Code block {...props}>{props.value}</Code>
)

const TextRenderer = ({ value }: any) => {
  if (value.startsWith('<!--')) {
    // See https://regexr.com/4arda
    const match = value.match(/<!--\s*props\(\s*(.+)\s*\)\s*(?:with\s*([\w\s-_,]+))?.*-->/)
    if (match && match[1]) {
      const component = match[1] as string
      const include = (match[2] || '').split(',').map((item: string) => item.trim()) as string[]
      return <PropsTable component={component} include={include} />
    }
  }
  return value
}

export function markdown (content: string) {
  return () => (
    <Markdown renderers={{
      code: CodeRenderer,
      html: TextRenderer
    }}>
      {ensureString(content)}
    </Markdown>
  )
}
