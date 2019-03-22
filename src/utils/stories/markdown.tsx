// @ts-ignore
import theme from 'prism-react-renderer/themes/duotoneLight'
import React from 'react'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import styled from 'styled-components'
import { ensureString, omit } from '..'
import * as UI from '../..'
import { Alert } from '../../Alert'
import { Code } from '../../Code'
import { Heading } from '../../Heading'
import { Markdown } from '../../Markdown'
import { Table } from '../../Table'
import { fromTheme } from '../styled'
import { preciseEm } from '../styled/isolated'
import { ObjectOf } from '../types'
import { blockProps } from './blockProps'
import { commonProps } from './commonProps'

const globals = {
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
  border-radius: ${fromTheme(theme => theme.global.borderRadius)}px;

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
  height: auto;
  overflow: hidden;
`

const StyledError = styled(Alert).attrs({
  danger: true
})<{ as: any }>`
  font-family: ${fromTheme(theme => theme.global.fontFamilyMonospace)};
`

const JsxRenderer = (props: any) => (
  <LiveProvider code={props.value} scope={globals}>
    <StyledEditorWrapper>
      <StyledEditor theme={theme} />
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

interface PropDefinition {
  defaultValue: any
  description: string
  name: string
  required: boolean
  type: {
    name: string
  }
}

const PropsTable = ({ component, withStyledSystem }: { component: string, withStyledSystem: boolean }) => {
  let props: ObjectOf<PropDefinition>
  try {
    const [main, sub] = component.split('.')
    props = sub
      // @ts-ignore
      ? UI[main][sub].__docgenInfo.props
      // @ts-ignore
      : UI[main].__docgenInfo.props
  } catch (err) {
    return <Alert danger>Could not load props for {component}</Alert>
  }

  if (!withStyledSystem) {
    props = omit(props, [
      ...commonProps,
      ...blockProps
    ])
  } else {
    props = omit(props, commonProps)
  }

  return (
    <>
      <Heading type='sub'>{component}</Heading>
      <Table>
        <colgroup>
          <col width='15%' />
          <col width='40%' />
          <col width='35%' />
          <col width='10%' />
        </colgroup>
        <thead>
        <tr>
          <th>Prop name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default value</th>
        </tr>
        </thead>
        <tbody>
        {Object.keys(props).sort().map(key => (
          <tr key={key}>
            <td>{props[key].name}</td>
            <td>{props[key].description}</td>
            <td>{props[key].type.name}</td>
            <td>{props[key].defaultValue}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  )
}

const TextRenderer = ({ value }: any) => {
  if (value.startsWith('<!--')) {
    const match = value.match(/<!--\s*props\(\s*(.+)\s*\).*-->/)
    if (match && match[1]) {
      const withStyledSystem = value.includes('styled-system')
      return <PropsTable component={match[1] as string} withStyledSystem={withStyledSystem} />
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
