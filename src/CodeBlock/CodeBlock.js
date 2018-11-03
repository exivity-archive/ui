import React from 'react'
import PropTypes from 'prop-types'
import { Paragraph } from 'reakit'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import style from 'react-syntax-highlighter/styles/prism/solarizedlight'

import theme from '../theme'

// @todo use light build but support all languages
// import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
// import jsx from 'react-syntax-highlighter/languages/prism/jsx'
// registerLanguage('jsx', jsx)

const CodeBlock = ({ children, showLineNumbers, language }) => {
  // Fix font-family on code element
  const myStyle = {
    ...style,
    'code[class*="language-"]': {
      ...style['code[class*="language-"]'],
      fontFamily: theme.type.fonts.monospace.family
    },
    'pre[class*="language-"]': {
      ...style['pre[class*="language-"]'],
      margin: undefined
    }
  }

  return <Paragraph as={SyntaxHighlighter}
    language={language}
    style={myStyle}
    showLineNumbers={showLineNumbers}
    customStyle={{
      fontFamily: theme.type.fonts.monospace.family,
      backgroundColor: theme.palette.marker
    }}>
    {children}
  </Paragraph>
}

// Language options:
// https://github.com/conorhastings/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
CodeBlock.propTypes = {
  children: PropTypes.node,
  language: PropTypes.oneOf(['text',
    'abap',
    'actionscript',
    'ada',
    'apacheconf',
    'apl',
    'applescript',
    'arduino',
    'arff',
    'asciidoc',
    'asm6502',
    'aspnet',
    'autohotkey',
    'autoit',
    'bash',
    'basic',
    'batch',
    'bison',
    'brainfuck',
    'bro',
    'c',
    'clike',
    'clojure',
    'coffeescript',
    'cpp',
    'crystal',
    'csharp',
    'csp',
    'cssExtras',
    'css',
    'd',
    'dart',
    'diff',
    'django',
    'docker',
    'eiffel',
    'elixir',
    'elm',
    'erb',
    'erlang',
    'flow',
    'fortran',
    'fsharp',
    'gedcom',
    'gherkin',
    'git',
    'glsl',
    'go',
    'graphql',
    'groovy',
    'haml',
    'handlebars',
    'haskell',
    'haxe',
    'hpkp',
    'hsts',
    'http',
    'ichigojam',
    'icon',
    'inform7',
    'ini',
    'io',
    'j',
    'java',
    'javascript',
    'jolie',
    'json',
    'jsx',
    'julia',
    'keyman',
    'kotlin',
    'latex',
    'less',
    'liquid',
    'lisp',
    'livescript',
    'lolcode',
    'lua',
    'makefile',
    'markdown',
    'markupTemplating',
    'markup',
    'matlab',
    'mel',
    'mizar',
    'monkey',
    'n4js',
    'nasm',
    'nginx',
    'nim',
    'nix',
    'nsis',
    'objectivec',
    'ocaml',
    'opencl',
    'oz',
    'parigp',
    'parser',
    'pascal',
    'perl',
    'phpExtras',
    'php',
    'plsql',
    'powershell',
    'processing',
    'prolog',
    'properties',
    'protobuf',
    'pug',
    'puppet',
    'pure',
    'python',
    'q',
    'qore',
    'r',
    'reason',
    'renpy',
    'rest',
    'rip',
    'roboconf',
    'ruby',
    'rust',
    'sas',
    'sass',
    'scala',
    'scheme',
    'scss',
    'smalltalk',
    'smarty',
    'soy',
    'sql',
    'stylus',
    'swift',
    'tcl',
    'textile',
    'tsx',
    'twig',
    'typescript',
    'vbnet',
    'velocity',
    'verilog',
    'vhdl',
    'vim',
    'visualBasic',
    'wasm',
    'wiki',
    'xeora',
    'xojo',
    'yaml']),
  showLineNumbers: PropTypes.bool
}

CodeBlock.defaultProps = {
  language: 'text'
}

export default CodeBlock
