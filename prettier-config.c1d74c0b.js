parcelRequire=function(e,r,n){var t="function"==typeof parcelRequire&&parcelRequire,i="function"==typeof require&&require;function u(n,o){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!o&&f)return f(n,!0);if(t)return t(n,!0);if(i&&"string"==typeof n)return i(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}a.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,a,l,l.exports)}return r[n].exports;function a(e){return u(a.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=t;for(var o=0;o<n.length;o++)u(n[o]);return u}({6:[function(require,module,exports) {
"use strict";function e(e,n){for(var t=[],r=[],o=arguments.length;o-- >2;)t.push(arguments[o]);for(;t.length;){var u=t.pop();if(u&&u.pop)for(o=u.length;o--;)t.push(u[o]);else null!=u&&!0!==u&&!1!==u&&r.push(u)}return"function"==typeof e?e(n||{},r):{nodeName:e,attributes:n||{},children:r,key:n&&n.key}}function n(e,n,t,r){var o,u=[].map,l=r&&r.children[0]||null,i=l&&function e(n){return{nodeName:n.nodeName.toLowerCase(),attributes:{},children:u.call(n.childNodes,function(n){return 3===n.nodeType?n.nodeValue:e(n)})}}(l),a=[],f=!0,c=p(e),s=function e(n,t,r){for(var o in r)"function"==typeof r[o]?function(e,o){r[e]=function(e){var u=o(e);return"function"==typeof u&&(u=u(g(n,c),r)),u&&u!==(t=g(n,c))&&!u.then&&h(c=m(n,p(t,u),c)),u}}(o,r[o]):e(n.concat(o),t[o]=p(t[o]),r[o]=p(r[o]));return r}([],c,p(n));return h(),s;function v(e){return"function"==typeof e?v(e(c,s)):null!=e?e:""}function d(){o=!o;var e=v(t);for(r&&!o&&(l=function e(n,t,r,o,u){if(o===r);else if(null==r||r.nodeName!==o.nodeName){var l=function e(n,t){var r="string"==typeof n||"number"==typeof n?document.createTextNode(n):(t=t||"svg"===n.nodeName)?document.createElementNS("http://www.w3.org/2000/svg",n.nodeName):document.createElement(n.nodeName);var o=n.attributes;if(o){o.oncreate&&a.push(function(){o.oncreate(r)});for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u]=v(n.children[u]),t));for(var l in o)b(r,l,o[l],null,t)}return r}(o,u);n.insertBefore(l,t),null!=r&&k(n,t,r),t=l}else if(null==r.nodeName)t.nodeValue=o;else{!function(e,n,t,r){for(var o in p(n,t))t[o]!==("value"===o||"checked"===o?e[o]:n[o])&&b(e,o,t[o],n[o],r);var u=f?t.oncreate:t.onupdate;u&&a.push(function(){u(e,n)})}(t,r.attributes,o.attributes,u=u||"svg"===o.nodeName);for(var i={},c={},s=[],d=r.children,h=o.children,m=0;m<d.length;m++){s[m]=t.childNodes[m];var g=y(d[m]);null!=g&&(i[g]=[s[m],d[m]])}for(var m=0,N=0;N<h.length;){var g=y(d[m]),w=y(h[N]=v(h[N]));if(c[g])m++;else if(null==w||f)null==g&&(e(t,s[m],d[m],h[N],u),N++),m++;else{var x=i[w]||[];g===w?(e(t,x[0],x[1],h[N],u),m++):x[0]?e(t,t.insertBefore(x[0],s[m]),x[1],h[N],u):e(t,s[m],null,h[N],u),c[w]=h[N],N++}}for(;m<d.length;)null==y(d[m])&&k(t,s[m],d[m]),m++;for(var m in i)c[m]||k(t,i[m][0],i[m][1])}return t}(r,l,i,i=e)),f=!1;a.length;)a.pop()()}function h(){o||(o=!0,setTimeout(d))}function p(e,n){var t={};for(var r in e)t[r]=e[r];for(var r in n)t[r]=n[r];return t}function m(e,n,t){var r={};return e.length?(r[e[0]]=e.length>1?m(e.slice(1),n,t[e[0]]):n,p(t,r)):n}function g(e,n){for(var t=0;t<e.length;)n=n[e[t++]];return n}function y(e){return e?e.key:null}function N(e){return e.currentTarget.events[e.type](e)}function b(e,n,t,r,o){if("key"===n);else if("style"===n)for(var u in p(r,t)){var l=null==t||null==t[u]?"":t[u];"-"===u[0]?e[n].setProperty(u,l):e[n][u]=l}else"o"===n[0]&&"n"===n[1]?(n=n.slice(2),e.events?r||(r=e.events[n]):e.events={},e.events[n]=t,t?r||e.addEventListener(n,N):e.removeEventListener(n,N)):n in e&&"list"!==n&&!o?e[n]=null==t?"":t:null!=t&&!1!==t&&e.setAttribute(n,t),null!=t&&!1!==t||e.removeAttribute(n)}function k(e,n,t){function r(){e.removeChild(function e(n,t){var r=t.attributes;if(r){for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);r.ondestroy&&r.ondestroy(n)}return n}(n,t))}var o=t.attributes&&t.attributes.onremove;o?o(n,r):r()}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.h=e,exports.app=n;
},{}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=[{name:"Print Width",key:"printWidth",description:"Line length the printer will wrap on?",type:"input",validate:"integer"},{name:"Tab Width",key:"tabWidth",description:"Number of spaces per indentation-level?",type:"input",validate:"integer"},{name:"Tabs",key:"useTabs",description:"Indent lines with tabs? (vs spaces)",type:"buttons",options:[!0,!1],validate:"boolean"},{name:"Semicolons",key:"semi",description:"Print semicolons at end of every statement? (vs ASI only)",type:"buttons",options:[!0,!1],validate:"boolean"},{name:"Quotes",key:"singleQuote",description:"Use single quotes? (vs double)",type:"buttons",options:[!0,!1],validate:"boolean"},{name:"Trailing Commas",key:"trailingComma",description:"Print trailing commas when multi-line for?",type:"buttons",options:["none","es5","all"],validate:"string"},{name:"Bracket Spacing",key:"bracketSpacing",description:"Print spaces between brackets in object literals?",type:"buttons",options:[!0,!1],examples:["{ foo: bar }","{foo: bar}"],validate:"boolean"},{name:"JSX Brackets",key:"jsxBracketSameLine",description:"Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line? (except for self closing elements)",type:"buttons",options:[!0,!1],validate:"boolean"},{name:"Arrow Function Parentheses",key:"arrowParens",description:"Include parentheses around a sole arrow function parameter?",type:"buttons",options:["avoid","always"],examples:["x => x","(x) => x"],validate:"string"},{name:"Range Start",key:"rangeStart",description:"Format only a segment of a file, starting at what character offset? (inclusive)",type:"input",validate:"integer"},{name:"Range End",key:"rangeEnd",description:"Format only a segment of a file, ending at what character offset? (exclusive)",type:"input",validate:"integer"},{name:"FilePath",key:"filePath",description:"The input filepath? (used to do parser inference.)",type:"input",validate:"string"},{name:"Require Pragma",key:"requirePragma",description:"Format files only containing a special comment (pragma) at top of file?",type:"buttons",options:[!0,!1],validate:"boolean"},{name:"Insert Pragma",key:"insertPragma",description:"Insert a special @format marker at the top of files specifying that the file has been formatted with prettier? (see require pragma)",type:"buttons",options:[!0,!1],validate:"boolean"},{name:"Prose Wrap",key:"proseWrap",description:"Wrap markdown text?",type:"buttons",options:["always","never","preserve"],validate:"string"}];exports.default=e;
},{}],3:[function(require,module,exports) {
"use strict";var e=require("hyperapp"),n=require("./options"),t=r(n);function r(e){return e&&e.__esModule?e:{default:e}}function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var l={selected:{printWidth:null,tabWidth:null,useTabs:null,semi:null,singleQuote:null,trailingComma:null,bracketSpacing:null,jsxBracketSameLine:null,arrowParens:null,rangeStart:null,rangeEnd:null,filePath:null,requirePragma:null,insertPragma:null,proseWrap:null},showConfig:!1,generatedConfig:""},o={selected:{updateOption:function(e){var n=e.name,t=e.value;return function(e){return i({},n,t)}}},resetConfig:function(){return function(e){return{showConfig:!1,generatedConfig:null,selected:Object.keys(e.selected).reduce(function(e,n){var t=i({},n,null);return Object.assign({},e,t)},{})}}},generateConfig:function(){return function(e){var n=e.selected,r=Object.keys(e.selected).reduce(function(e,r){var l=n[r],o=t.default.find(function(e){return e.key===r}).validate,u=null!==l&&"integer"===o?parseInt(l):l,a=i({},r,u);return null!==u?Object.assign({},e,a):e},{});return{showConfig:!0,generatedConfig:JSON.stringify(r)}}}},u=function(n){var t=n.name,r=n.key,i=n.description,l=n.type,o=n.options,u=n.state,a=n.clickFunc;return(0,e.h)("div",{class:"box"},(0,e.h)("h3",null,t),(0,e.h)("div",{class:"description"},i),"buttons"==l?(0,e.h)("div",null,o.map(function(n){return(0,e.h)("button",{class:u===n&&"selected",key:n,onclick:function(e){return a({name:r,value:n})}},n.toString())})):(0,e.h)("div",null,(0,e.h)("input",{onkeyup:function(e){var n=e.target.value;return a({name:r,value:n})}})))},a=function(n){var t=n.generatedConfig,r=n.resetConfig;return(0,e.h)("div",{class:"modal-overlay"},(0,e.h)("div",{class:"modal"},(0,e.h)("h2",null,"Your prettier config:"),(0,e.h)("textarea",{name:"textarea",autofocus:!0,rows:"10",cols:"50"},t),(0,e.h)("div",{class:"description"},"Copy and paste this into your project's ",(0,e.h)("code",null,".prettierrc")," file. "),(0,e.h)("div",{class:"description"},"Tip: Run prettier on this file! ",(0,e.h)("code",null,"prettier .prettierrc --write")),(0,e.h)("div",null,(0,e.h)("button",{class:"green",onclick:r},"Generate a new config"))))},c=function(n,r){return(0,e.h)("div",null,n.showConfig&&(0,e.h)(a,{generatedConfig:n.generatedConfig,resetConfig:r.resetConfig}),(0,e.h)("h1",null,"Prettier Config Generator"),(0,e.h)("div",{class:"description"},"Select/fill in a few options to generate a json config you can use for your .prettierrc file #lazyftw"),(0,e.h)("div",{class:"container"},t.default.map(function(t){var i=t.name,l=t.key,o=t.description,a=t.type,c=t.options;return(0,e.h)(u,{name:i,key:l,type:a,description:o,state:n.selected[l],options:c,clickFunc:r.selected.updateOption})}),(0,e.h)("button",{class:"box green",onclick:r.generateConfig},"Generate Config")))};(0,e.app)(l,o,c,document.body);
},{"hyperapp":6,"./options":5}]},{},[3])
//# sourceMappingURL=prettier-config.c1d74c0b.map