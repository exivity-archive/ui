(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{2802:function(module,exports,__webpack_require__){"use strict";function diff(Prism){!function(Prism){Prism.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d+.*$/m]};var PREFIXES={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"};Object.keys(PREFIXES).forEach((function(name){var prefix=PREFIXES[name],alias=[];/^\w+$/.test(name)||alias.push(/\w+/.exec(name)[0]),"diff"===name&&alias.push("bold"),Prism.languages.diff[name]={pattern:RegExp("^(?:["+prefix+"].*(?:\r\n?|\n|(?![\\s\\S])))+","m"),alias:alias}})),Object.defineProperty(Prism.languages.diff,"PREFIXES",{value:PREFIXES})}(Prism)}module.exports=diff,diff.displayName="diff",diff.aliases=[]},551:function(module,exports,__webpack_require__){"use strict";var _interopRequireDefault=__webpack_require__(246);Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _default=_interopRequireDefault(__webpack_require__(2802)).default;exports.default=_default}}]);
//# sourceMappingURL=46.e8c719e611ec975395da.bundle.js.map