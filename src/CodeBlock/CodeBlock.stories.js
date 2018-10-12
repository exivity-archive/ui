import React from 'react'
import { storiesOf } from '@storybook/react'

import CodeBlock from './CodeBlock'

storiesOf('atoms|CodeBlock', module)
  .add('default', () => <CodeBlock>{`CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.oneOf(['jsx']).isRequired,
  theme: PropTypes.object.isRequired
}

CodeBlock.defaultProps = {
  language: 'jsx'
}`}</CodeBlock>)
