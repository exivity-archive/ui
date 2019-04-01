import React, { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { Code } from '../Code'
import { Heading } from '../Heading'
import { HeadingType } from '../Heading/Heading'
import { Link } from '../Link'
import { List } from '../List'
import { Paragraph } from '../Paragraph'
import { Table } from '../Table'
import { ObjectOf } from '../utils/types'

type Renderer = (props: any) => ReactElement

const headingLevelToType: {
  [level: number]: HeadingType
} = { 1: 'header', 2: 'section', 3: 'sub', 4: 'sub', 5: 'sub', 6: 'sub' }

const defaultRenderers: ObjectOf<Renderer> = {
  code: props => <Code block {...props}>{props.value}</Code>,
  heading: ({ level, ...rest }) => <Heading type={headingLevelToType[level]} {...rest} />,
  inlineCode: props => <Code {...props} />,
  link: props => <Link {...props} />,
  list: props => <List {...props} unordered={!props.ordered} />,
  paragraph: props => <Paragraph {...props} />,
  table: props => <Table {...props} />
}

interface MarkdownProps {
  renderers?: ObjectOf<Renderer>,
  children?: string
}

export const Markdown = ({ children, renderers = {} }: MarkdownProps) => (
  <ReactMarkdown
    renderers={{
      ...defaultRenderers,
      ...renderers
    }}
    source={children} />
)
