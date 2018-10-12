import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import SyntaxHighlighter, {
  registerLanguage
} from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import style from 'react-syntax-highlighter/styles/prism/solarizedlight'

registerLanguage('jsx', jsx)

const CodeBlock = ({ children, language, theme }) => {
  // Fix font-family on code element
  const myStyle = {
    ...style,
    'code[class*="language-"]': {
      ...style['code[class*="language-"]'],
      fontFamily: theme.fonts.code.family
    }
  }

  return <SyntaxHighlighter
    language={language}
    style={myStyle}
    customStyle={{
      padding: `${theme.spacing}em`,
      fontFamily: theme.fonts.code.family,
      backgroundColor: theme.colours.mark,
    }}>
    {children}
  </SyntaxHighlighter>
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.oneOf(['jsx']).isRequired,
  theme: PropTypes.object.isRequired
}

CodeBlock.defaultProps = {
  language: 'jsx'
}

export default withTheme(CodeBlock)
