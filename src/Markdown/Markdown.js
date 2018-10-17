import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import { List, Link, Paragraph, Heading } from 'reakit'

import Code from '../Code'
import CodeBlock from '../CodeBlock'
import Table from '../Table'

const defaultRenderers = {
  link: props => <Link {...props} />,
  paragraph: props => <Paragraph {...props} />,
  heading: props => <Heading {...props} as={`h${props.level}`} />,
  table: props => <Table {...props} />,
  inlineCode: props => <Code {...props} />,
  code: props => <CodeBlock {...props}>{props.value}</CodeBlock>,
  list: props => <List {...props} unordered={!props.ordered} />
}

const Markdown = ({ children, renderers }) => (
  <ReactMarkdown
    renderers={renderers}
    source={children} />
)

Markdown.propTypes = {
  children: PropTypes.string,
  renderers: PropTypes.object
}

Markdown.defaultProps = {
  renderers: defaultRenderers
}

export default Markdown
