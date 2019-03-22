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

const globals = {
  styled,
  fromTheme,
  ...UI
}

const StyledEditorWrapper = styled.div`
  font-family: ${fromTheme(theme => theme.global.fontFamilyMonospace)};
  font-weight: normal;
  font-size: ${fromTheme(theme => theme.global.baseSize)}px;
  color: ${fromTheme(theme => theme.global.textColor)};
  line-height: ${fromTheme(theme => theme.global.lineHeight)};

  background-color: ${fromTheme(theme => theme.colors.lightGray)};
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;

  textarea:focus {
    outline: none;
  }
`

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0;
  background: white;
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
