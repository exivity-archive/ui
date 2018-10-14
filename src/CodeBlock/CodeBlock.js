import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'reakit'
import SyntaxHighlighter, {
  registerLanguage
} from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import style from 'react-syntax-highlighter/styles/prism/solarizedlight'

import theme from '../theme'

registerLanguage('jsx', jsx)

const CodeBlock = ({ children, language }) => {
  // Fix font-family on code element
  const myStyle = {
    ...style,
    'code[class*="language-"]': {
      ...style['code[class*="language-"]'],
      fontFamily: theme.type.fonts.monospace.family
    }
  }

  return <Box as={SyntaxHighlighter}
    language={language}
    style={myStyle}
    customStyle={{
      fontFamily: theme.type.fonts.monospace.family,
      backgroundColor: theme.palette.marker
    }}>
    {children}
  </Box>
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.oneOf(['jsx']).isRequired
}

CodeBlock.defaultProps = {
  language: 'jsx'
}

export default CodeBlock
