import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import Code from '../Code'
import CodeBlock from '../CodeBlock'
import Table from '../Table'

const defaultRenderers = {
  table: props => <Table {...props} />,
  inlineCode: props => <Code {...props} />,
  code: props => <CodeBlock {...props}>{props.value}</CodeBlock>
}

const Markdown = ({ children, renderers }) => (
  <ReactMarkdown
    renderers={renderers}
    source={children} />
)

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
  renderers: PropTypes.object
}

Markdown.defaultProps = {
  renderers: defaultRenderers
}

export default Markdown
