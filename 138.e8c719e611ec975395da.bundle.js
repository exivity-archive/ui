(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{2902:function(module,exports,__webpack_require__){"use strict";function velocity(Prism){!function(Prism){Prism.languages.velocity=Prism.languages.extend("markup",{});var velocity={variable:{pattern:/(^|[^\\](?:\\\\)*)\$!?(?:[a-z][\w-]*(?:\([^)]*\))?(?:\.[a-z][\w-]*(?:\([^)]*\))?|\[[^\]]+])*|{[^}]+})/i,lookbehind:!0,inside:{}},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},number:/\b\d+\b/,boolean:/\b(?:true|false)\b/,operator:/[=!<>]=?|[+*/%-]|&&|\|\||\.\.|\b(?:eq|g[et]|l[et]|n(?:e|ot))\b/,punctuation:/[(){}[\]:,.]/};velocity.variable.inside={string:velocity.string,function:{pattern:/([^\w-])[a-z][\w-]*(?=\()/,lookbehind:!0},number:velocity.number,boolean:velocity.boolean,punctuation:velocity.punctuation},Prism.languages.insertBefore("velocity","comment",{unparsed:{pattern:/(^|[^\\])#\[\[[\s\S]*?]]#/,lookbehind:!0,greedy:!0,inside:{punctuation:/^#\[\[|]]#$/}},"velocity-comment":[{pattern:/(^|[^\\])#\*[\s\S]*?\*#/,lookbehind:!0,greedy:!0,alias:"comment"},{pattern:/(^|[^\\])##.*/,lookbehind:!0,greedy:!0,alias:"comment"}],directive:{pattern:/(^|[^\\](?:\\\\)*)#@?(?:[a-z][\w-]*|{[a-z][\w-]*})(?:\s*\((?:[^()]|\([^()]*\))*\))?/i,lookbehind:!0,inside:{keyword:{pattern:/^#@?(?:[a-z][\w-]*|{[a-z][\w-]*})|\bin\b/,inside:{punctuation:/[{}]/}},rest:velocity}},variable:velocity.variable}),Prism.languages.velocity.tag.inside["attr-value"].inside.rest=Prism.languages.velocity}(Prism)}module.exports=velocity,velocity.displayName="velocity",velocity.aliases=[]},660:function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(246);Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default=_interopRequireDefault(__webpack_require__(2902)).default;exports.default=_default}}]);
//# sourceMappingURL=138.e8c719e611ec975395da.bundle.js.map