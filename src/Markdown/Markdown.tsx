import React, { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import { Code } from '../Code'
import { Heading } from '../Heading'
import { HeadingType } from '../Heading/Heading'
import { Link } from '../Link'
import { Paragraph } from '../Paragraph'
import { ObjectOf } from '../utils/types'

type Renderer = (props: any) => ReactElement

const headingLevelToType: {
  [level: number]: HeadingType
} = { 1: 'header', 2: 'section', 3: 'sub', 4: 'sub', 5: 'sub', 6: 'sub' }

const defaultRenderers: ObjectOf<Renderer> = {
  link: props => <Link {...props} />,
  paragraph: props => <Paragraph {...props} />,
  heading: ({ level, ...rest }) => <Heading type={headingLevelToType[level]} {...rest} />,
  inlineCode: props => <Code {...props} />,
  code: props => <Code block {...props}>{props.value}</Code>
}

interface MarkdownProps {
  renderers?: ObjectOf<Renderer>,
  children?: string
}

export const Markdown = ({ children, renderers = defaultRenderers }: MarkdownProps) => (
  <ReactMarkdown
    renderers={renderers}
    source={children} />
)
