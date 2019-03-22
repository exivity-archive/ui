// @ts-ignore
import theme from 'prism-react-renderer/themes/duotoneLight'
import React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import styled from 'styled-components'
import * as UI from '../..'
import { Alert } from '../../Alert'
import { Code } from '../../Code'
import { Heading } from '../../Heading'
import { Markdown } from '../../Markdown'
import { ensureString } from '../index'
import { fromTheme } from '../styled'
import { preciseEm } from '../styled/isolated'

const globals = {
  styled,
  fromTheme,
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
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;

  padding: calc(${fromTheme(theme => theme.global.baseSpacing)}em - 10px) !important;

  textarea:focus {
    outline: none;
  }
`

const StyledPreview = styled(LivePreview)`
  position: relative;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><g fill='#f7f7f7'><rect width='5' height='5' y='0' x='0'/><rect width='5' height='5' y='5' x='5'/></g></svg>");
  padding: ${preciseEm(1)}em;
  height: auto;
  overflow: hidden;
`

const StyledError = styled(Alert).attrs({
  danger: true
})`
  font-family: ${fromTheme(theme => theme.global.fontFamilyMonospace)};
`

const JsxRenderer = (props: any) => (
  <LiveProvider code={props.value} scope={globals}>
    <StyledEditorWrapper>
      <LiveEditor theme={theme} />
    </StyledEditorWrapper>
    <StyledError as={LiveError} />
    <Heading type='sub'>Preview</Heading>
    <StyledPreview />
  </LiveProvider>
)

const CodeRenderer = (props: any) => (
  props.language === 'jsx'
    ? <JsxRenderer {...props} />
    : <Code block {...props}>{props.value}</Code>
)

export function markdown (content: string) {
  return () => (
    <Markdown renderers={{
      code: CodeRenderer
    }}>
      {ensureString(content)}
    </Markdown>
  )
}
