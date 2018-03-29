// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function(modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require === 'function' && require;

    function newRequire(name, jumped) {
        if (!cache[name]) {
            if (!modules[name]) {
                // if we cannot find the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire =
                    typeof require === 'function' && require;
                if (!jumped && currentRequire) {
                    return currentRequire(name, true);
                }

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) {
                    return previousRequire(name, true);
                }

                var err = new Error(
                    "Cannot find module '" + name + "'"
                );
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }

            localRequire.resolve = resolve;

            var module = (cache[name] = new newRequire.Module());

            modules[name][0].call(
                module.exports,
                localRequire,
                module,
                module.exports
            );
        }

        return cache[name].exports;

        function localRequire(x) {
            return newRequire(localRequire.resolve(x));
        }

        function resolve(x) {
            return modules[name][1][x] || x;
        }
    }

    function Module() {
        this.bundle = newRequire;
        this.exports = {};
    }

    newRequire.Module = Module;
    newRequire.modules = modules;
    newRequire.cache = cache;
    newRequire.parent = previousRequire;

    for (var i = 0; i < entry.length; i++) {
        newRequire(entry[i]);
    }

    // Override the current require with this new one
    return newRequire;
})(
    {
        8: [
            function(require, module, exports) {
                'use strict';

                Object.defineProperty(exports, '__esModule', {
                    value: true
                });
                exports.h = h;
                exports.app = app;
                function h(name, props) {
                    var node;
                    var rest = [];
                    var children = [];
                    var length = arguments.length;

                    while (length-- > 2) {
                        rest.push(arguments[length]);
                    }
                    while (rest.length) {
                        if (Array.isArray((node = rest.pop()))) {
                            for (length = node.length; length--; ) {
                                rest.push(node[length]);
                            }
                        } else if (
                            node != null &&
                            node !== true &&
                            node !== false
                        ) {
                            children.push(node);
                        }
                    }

                    return typeof name === 'function'
                        ? name(props || {}, children)
                        : {
                              name: name,
                              props: props || {},
                              children: children
                          };
                }

                function app(state, actions, view, container) {
                    var renderLock;
                    var invokeLaterStack = [];
                    var rootElement =
                        (container && container.children[0]) || null;
                    var lastNode =
                        rootElement && toVNode(rootElement, [].map);
                    var globalState = copy(state);
                    var wiredActions = copy(actions);

                    scheduleRender(
                        wireStateToActions(
                            [],
                            globalState,
                            wiredActions
                        )
                    );

                    return wiredActions;

                    function toVNode(element, map) {
                        return {
                            name: element.nodeName.toLowerCase(),
                            props: {},
                            children: map.call(
                                element.childNodes,
                                function(element) {
                                    return element.nodeType === 3
                                        ? element.nodeValue
                                        : toVNode(element, map);
                                }
                            )
                        };
                    }

                    function render() {
                        renderLock = !renderLock;

                        var next = view(globalState, wiredActions);
                        if (container && !renderLock) {
                            rootElement = patch(
                                container,
                                rootElement,
                                lastNode,
                                (lastNode = next)
                            );
                        }

                        while ((next = invokeLaterStack.pop())) {
                            next();
                        }
                    }

                    function scheduleRender() {
                        if (!renderLock) {
                            renderLock = !renderLock;
                            setTimeout(render);
                        }
                    }

                    function copy(target, source) {
                        var obj = {};

                        for (var i in target) {
                            obj[i] = target[i];
                        }
                        for (var i in source) {
                            obj[i] = source[i];
                        }
                        return obj;
                    }

                    function set(path, value, source) {
                        var target = {};
                        if (path.length) {
                            target[path[0]] =
                                path.length > 1
                                    ? set(
                                          path.slice(1),
                                          value,
                                          source[path[0]]
                                      )
                                    : value;
                            return copy(source, target);
                        }
                        return value;
                    }

                    function get(path, source) {
                        for (var i = 0; i < path.length; i++) {
                            source = source[path[i]];
                        }
                        return source;
                    }

                    function wireStateToActions(
                        path,
                        state,
                        actions
                    ) {
                        for (var key in actions) {
                            typeof actions[key] === 'function'
                                ? (function(key, action) {
                                      actions[key] = function(data) {
                                          if (
                                              typeof (data = action(
                                                  data
                                              )) === 'function'
                                          ) {
                                              data = data(
                                                  get(
                                                      path,
                                                      globalState
                                                  ),
                                                  actions
                                              );
                                          }

                                          if (
                                              data &&
                                              data !==
                                                  (state = get(
                                                      path,
                                                      globalState
                                                  )) &&
                                              !data.then // Promise
                                          ) {
                                              scheduleRender(
                                                  (globalState = set(
                                                      path,
                                                      copy(
                                                          state,
                                                          data
                                                      ),
                                                      globalState
                                                  ))
                                              );
                                          }

                                          return data;
                                      };
                                  })(key, actions[key])
                                : wireStateToActions(
                                      path.concat(key),
                                      (state[key] = state[key] || {}),
                                      (actions[key] = copy(
                                          actions[key]
                                      ))
                                  );
                        }
                    }

                    function getKey(node) {
                        return node && node.props
                            ? node.props.key
                            : null;
                    }

                    function setElementProp(
                        element,
                        name,
                        value,
                        isSVG,
                        oldValue
                    ) {
                        if (name === 'key') {
                        } else if (name === 'style') {
                            for (var i in copy(oldValue, value)) {
                                element[name][i] =
                                    value == null || value[i] == null
                                        ? ''
                                        : value[i];
                            }
                        } else {
                            if (
                                typeof value === 'function' ||
                                (name in element && !isSVG)
                            ) {
                                element[name] =
                                    value == null ? '' : value;
                            } else if (
                                value != null &&
                                value !== false
                            ) {
                                element.setAttribute(name, value);
                            }

                            if (value == null || value === false) {
                                element.removeAttribute(name);
                            }
                        }
                    }

                    function createElement(node, isSVG) {
                        var element =
                            typeof node === 'string' ||
                            typeof node === 'number'
                                ? document.createTextNode(node)
                                : (isSVG =
                                      isSVG || node.name === 'svg')
                                    ? document.createElementNS(
                                          'http://www.w3.org/2000/svg',
                                          node.name
                                      )
                                    : document.createElement(
                                          node.name
                                      );

                        if (node.props) {
                            if (node.props.oncreate) {
                                invokeLaterStack.push(function() {
                                    node.props.oncreate(element);
                                });
                            }

                            for (
                                var i = 0;
                                i < node.children.length;
                                i++
                            ) {
                                element.appendChild(
                                    createElement(
                                        node.children[i],
                                        isSVG
                                    )
                                );
                            }

                            for (var name in node.props) {
                                setElementProp(
                                    element,
                                    name,
                                    node.props[name],
                                    isSVG
                                );
                            }
                        }

                        return element;
                    }

                    function updateElement(
                        element,
                        oldProps,
                        props,
                        isSVG
                    ) {
                        for (var name in copy(oldProps, props)) {
                            if (
                                props[name] !==
                                (name === 'value' ||
                                name === 'checked'
                                    ? element[name]
                                    : oldProps[name])
                            ) {
                                setElementProp(
                                    element,
                                    name,
                                    props[name],
                                    isSVG,
                                    oldProps[name]
                                );
                            }
                        }

                        if (props.onupdate) {
                            invokeLaterStack.push(function() {
                                props.onupdate(element, oldProps);
                            });
                        }
                    }

                    function removeChildren(element, node, props) {
                        if ((props = node.props)) {
                            for (
                                var i = 0;
                                i < node.children.length;
                                i++
                            ) {
                                removeChildren(
                                    element.childNodes[i],
                                    node.children[i]
                                );
                            }

                            if (props.ondestroy) {
                                props.ondestroy(element);
                            }
                        }
                        return element;
                    }

                    function removeElement(
                        parent,
                        element,
                        node,
                        cb
                    ) {
                        function done() {
                            parent.removeChild(
                                removeChildren(element, node)
                            );
                        }

                        if (
                            node.props &&
                            (cb = node.props.onremove)
                        ) {
                            cb(element, done);
                        } else {
                            done();
                        }
                    }

                    function patch(
                        parent,
                        element,
                        oldNode,
                        node,
                        isSVG,
                        nextSibling
                    ) {
                        if (node === oldNode) {
                        } else if (oldNode == null) {
                            element = parent.insertBefore(
                                createElement(node, isSVG),
                                element
                            );
                        } else if (
                            node.name &&
                            node.name === oldNode.name
                        ) {
                            updateElement(
                                element,
                                oldNode.props,
                                node.props,
                                (isSVG = isSVG || node.name === 'svg')
                            );

                            var oldElements = [];
                            var oldKeyed = {};
                            var newKeyed = {};

                            for (
                                var i = 0;
                                i < oldNode.children.length;
                                i++
                            ) {
                                oldElements[i] =
                                    element.childNodes[i];

                                var oldChild = oldNode.children[i];
                                var oldKey = getKey(oldChild);

                                if (null != oldKey) {
                                    oldKeyed[oldKey] = [
                                        oldElements[i],
                                        oldChild
                                    ];
                                }
                            }

                            var i = 0;
                            var j = 0;

                            while (j < node.children.length) {
                                var oldChild = oldNode.children[i];
                                var newChild = node.children[j];

                                var oldKey = getKey(oldChild);
                                var newKey = getKey(newChild);

                                if (newKeyed[oldKey]) {
                                    i++;
                                    continue;
                                }

                                if (newKey == null) {
                                    if (oldKey == null) {
                                        patch(
                                            element,
                                            oldElements[i],
                                            oldChild,
                                            newChild,
                                            isSVG
                                        );
                                        j++;
                                    }
                                    i++;
                                } else {
                                    var recyledNode =
                                        oldKeyed[newKey] || [];

                                    if (oldKey === newKey) {
                                        patch(
                                            element,
                                            recyledNode[0],
                                            recyledNode[1],
                                            newChild,
                                            isSVG
                                        );
                                        i++;
                                    } else if (recyledNode[0]) {
                                        patch(
                                            element,
                                            element.insertBefore(
                                                recyledNode[0],
                                                oldElements[i]
                                            ),
                                            recyledNode[1],
                                            newChild,
                                            isSVG
                                        );
                                    } else {
                                        patch(
                                            element,
                                            oldElements[i],
                                            null,
                                            newChild,
                                            isSVG
                                        );
                                    }

                                    j++;
                                    newKeyed[newKey] = newChild;
                                }
                            }

                            while (i < oldNode.children.length) {
                                var oldChild = oldNode.children[i];
                                if (getKey(oldChild) == null) {
                                    removeElement(
                                        element,
                                        oldElements[i],
                                        oldChild
                                    );
                                }
                                i++;
                            }

                            for (var i in oldKeyed) {
                                if (
                                    !newKeyed[
                                        oldKeyed[i][1].props.key
                                    ]
                                ) {
                                    removeElement(
                                        element,
                                        oldKeyed[i][0],
                                        oldKeyed[i][1]
                                    );
                                }
                            }
                        } else if (node.name === oldNode.name) {
                            element.nodeValue = node;
                        } else {
                            element = parent.insertBefore(
                                createElement(node, isSVG),
                                (nextSibling = element)
                            );
                            removeElement(
                                parent,
                                nextSibling,
                                oldNode
                            );
                        }
                        return element;
                    }
                }
            },
            {}
        ],
        5: [
            function(require, module, exports) {
                'use strict';

                Object.defineProperty(exports, '__esModule', {
                    value: true
                });
                var options = [
                    {
                        name: 'Print Width',
                        key: 'printWidth',
                        description:
                            'Line length the printer will wrap on?',
                        type: 'input',
                        validate: 'number'
                    },
                    {
                        name: 'Tab Width',
                        key: 'tabWidth',
                        description:
                            'Number of spaces per indentation-level?',
                        type: 'input',
                        validate: 'number'
                    },
                    {
                        name: 'Tabs',
                        key: 'tabs',
                        description: 'Indent lines with which?',
                        type: 'buttons',
                        options: ['tabs', 'spaces'],
                        validate: 'string'
                    },
                    {
                        name: 'Semicolons',
                        key: 'semicolons',
                        description: 'When to print semicolons?',
                        type: 'buttons',
                        options: ['all statements', 'just asi'],
                        validate: 'string'
                    },
                    {
                        name: 'Quotes',
                        key: 'quotes',
                        description: 'What types of quotes to use?',
                        type: 'buttons',
                        options: ['single', 'double'],
                        validate: 'string'
                    },
                    {
                        name: 'Trailing Commas',
                        key: 'trailingCommas',
                        description:
                            'Print trailing commas when multi-line for?',
                        type: 'buttons',
                        options: ['none', 'es5', 'all'],
                        validate: 'string'
                    },
                    {
                        name: 'Bracket Spacing',
                        key: 'bracketSpacing',
                        description:
                            'Print spaces between brackets in object literals?',
                        type: 'buttons',
                        options: [true, false],
                        examples: ['{ foo: bar }', '{foo: bar}'],
                        validate: 'string'
                    },
                    {
                        name: 'JSX Brackets',
                        key: 'jsxBracketSameLine',
                        description:
                            'Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line? (except for self closing elements)',
                        type: 'buttons',
                        options: [true, false],
                        validate: 'boolean'
                    },
                    {
                        name: 'Arrow Function Parentheses',
                        key: 'arrowParens',
                        description:
                            'Include parentheses around a sole arrow function parameter?',
                        type: 'buttons',
                        options: ['avoid', 'always'],
                        examples: ['x => x', '(x) => x'],
                        validate: 'string'
                    },
                    {
                        name: 'Range Start',
                        key: 'rangeStart',
                        description:
                            'Format only a segment of a file, starting at what character offset? (inclusive)',
                        type: 'input',
                        validate: 'number'
                    },
                    {
                        name: 'Range End',
                        key: 'rangeEnd',
                        description:
                            'Format only a segment of a file, ending at what character offset? (exclusive)',
                        type: 'input',
                        validate: 'number'
                    },
                    {
                        name: 'FilePath',
                        key: 'filePath',
                        description:
                            'The input filepath? (used to do parser inference.)',
                        type: 'input',
                        validate: 'string'
                    },
                    {
                        name: 'Require Pragma',
                        key: 'requirePragma',
                        description:
                            'Format files only containing a special comment (pragma) at top of file?',
                        type: 'buttons',
                        options: [true, false],
                        validate: 'boolean'
                    },
                    {
                        name: 'Insert Pragma',
                        key: 'insertPragma',
                        description:
                            'Insert a special @format marker at the top of files specifying that the file has been formatted with prettier? (see require pragma)',
                        type: 'buttons',
                        options: [true, false],
                        validate: 'boolean'
                    },
                    {
                        name: 'Prose Wrap',
                        key: 'proseWrap',
                        description: 'Wrap markdown text?',
                        type: 'buttons',
                        options: ['always', 'never', 'preserve'],
                        validate: 'string'
                    }
                ];

                exports.default = options;
            },
            {}
        ],
        3: [
            function(require, module, exports) {
                'use strict';

                var _hyperapp = require('hyperapp');

                var _options = require('./options');

                var _options2 = _interopRequireDefault(_options);

                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule
                        ? obj
                        : { default: obj };
                }

                function _defineProperty(obj, key, value) {
                    if (key in obj) {
                        Object.defineProperty(obj, key, {
                            value: value,
                            enumerable: true,
                            configurable: true,
                            writable: true
                        });
                    } else {
                        obj[key] = value;
                    }
                    return obj;
                }

                var state = {
                    selected: {
                        printWidth: null,
                        tabWidth: null,
                        tabs: null,
                        semicolons: null,
                        quotes: null,
                        trailingCommas: null,
                        bracketSpacing: null,
                        jsxBracketSameLine: null,
                        arrowParens: null,
                        rangeStart: null,
                        rangeEnd: null,
                        filePath: null,
                        requirePragma: null,
                        insertPragma: null,
                        proseWrap: null
                    },
                    showConfig: false,
                    generatedConfig: ''
                };

                var actions = {
                    selected: {
                        updateOption: function updateOption(_ref) {
                            var name = _ref.name,
                                value = _ref.value;
                            return function(state) {
                                return _defineProperty(
                                    {},
                                    name,
                                    value
                                );
                            };
                        }
                    },
                    resetConfig: function resetConfig() {
                        return function(state) {
                            var keys = Object.keys(state.selected);
                            var selected = keys.reduce(function(
                                acc,
                                k
                            ) {
                                var newObject = _defineProperty(
                                    {},
                                    k,
                                    null
                                );
                                return Object.assign(
                                    {},
                                    acc,
                                    newObject
                                );
                            },
                            {});
                            return {
                                showConfig: false,
                                generatedConfig: null,
                                selected: selected
                            };
                        };
                    },
                    generateConfig: function generateConfig() {
                        return function(state) {
                            var selected = state.selected;

                            var keys = Object.keys(state.selected);
                            var result = keys.reduce(function(
                                acc,
                                k
                            ) {
                                var selectedKey = selected[k];
                                var optionKey = _options2.default.find(
                                    function(o) {
                                        return o.key === k;
                                    }
                                );
                                var validate = optionKey.validate;
                                var value =
                                    selectedKey !== null &&
                                    validate === 'number'
                                        ? parseInt(selectedKey)
                                        : selectedKey;
                                var newObject = _defineProperty(
                                    {},
                                    k,
                                    value
                                );
                                return value !== null
                                    ? Object.assign(
                                          {},
                                          acc,
                                          newObject
                                      )
                                    : acc;
                            },
                            {});
                            var generatedConfig = JSON.stringify(
                                result
                            );
                            return {
                                showConfig: true,
                                generatedConfig: generatedConfig
                            };
                        };
                    }
                };

                var Option = function Option(_ref3) {
                    var name = _ref3.name,
                        key = _ref3.key,
                        description = _ref3.description,
                        type = _ref3.type,
                        options = _ref3.options,
                        state = _ref3.state,
                        clickFunc = _ref3.clickFunc;
                    return (0, _hyperapp.h)(
                        'div',
                        { class: 'box' },
                        (0, _hyperapp.h)('h2', null, name),
                        (0, _hyperapp.h)(
                            'div',
                            {
                                class: 'description'
                            },
                            description
                        ),
                        type == 'buttons'
                            ? (0, _hyperapp.h)(
                                  'div',
                                  null,
                                  options.map(function(o) {
                                      return (0, _hyperapp.h)(
                                          'button',
                                          {
                                              class:
                                                  state === o &&
                                                  'selected',
                                              key: o,
                                              onclick: function onclick(
                                                  e
                                              ) {
                                                  return clickFunc({
                                                      name: key,
                                                      value: o
                                                  });
                                              }
                                          },
                                          o.toString()
                                      );
                                  })
                              )
                            : (0, _hyperapp.h)(
                                  'div',
                                  null,
                                  (0, _hyperapp.h)('input', {
                                      onkeyup: function onkeyup(
                                          _ref4
                                      ) {
                                          var value =
                                              _ref4.target.value;
                                          return clickFunc({
                                              name: key,
                                              value: value
                                          });
                                      }
                                  })
                              )
                    );
                };

                var Config = function Config(_ref5) {
                    var generatedConfig = _ref5.generatedConfig,
                        resetConfig = _ref5.resetConfig;
                    return (0, _hyperapp.h)(
                        'div',
                        {
                            class: 'modal-overlay'
                        },
                        (0, _hyperapp.h)(
                            'div',
                            { class: 'modal' },
                            (0, _hyperapp.h)(
                                'h1',
                                null,
                                'Your prettier config:'
                            ),
                            (0, _hyperapp.h)(
                                'textarea',
                                {
                                    name: 'textarea',
                                    autofocus: true,
                                    rows: '10',
                                    cols: '50'
                                },
                                generatedConfig
                            ),
                            (0, _hyperapp.h)(
                                'div',
                                null,
                                (0, _hyperapp.h)(
                                    'button',
                                    {
                                        class: 'green',
                                        onclick: resetConfig
                                    },
                                    'Generate a new config'
                                )
                            )
                        )
                    );
                };

                var view = function view(state, actions) {
                    return (0, _hyperapp.h)(
                        'div',
                        null,
                        state.showConfig &&
                            (0, _hyperapp.h)(Config, {
                                generatedConfig:
                                    state.generatedConfig,
                                resetConfig: actions.resetConfig
                            }),
                        (0, _hyperapp.h)(
                            'h1',
                            null,
                            'Prettier Config Generator'
                        ),
                        (0, _hyperapp.h)(
                            'div',
                            {
                                class: 'description'
                            },
                            'Select/fill in a few options to generate a json file you can use for your .prettierrc file #lazyftw'
                        ),
                        (0, _hyperapp.h)(
                            'div',
                            {
                                class: 'container'
                            },
                            _options2.default.map(function(_ref6) {
                                var name = _ref6.name,
                                    key = _ref6.key,
                                    description = _ref6.description,
                                    type = _ref6.type,
                                    options = _ref6.options;

                                return (0, _hyperapp.h)(Option, {
                                    name: name,
                                    key: key,
                                    type: type,
                                    description: description,
                                    state: state.selected[key],
                                    options: options,
                                    clickFunc:
                                        actions.selected.updateOption
                                });
                            })
                        ),
                        (0, _hyperapp.h)(
                            'button',
                            {
                                class: 'green right',
                                onclick: actions.generateConfig
                            },
                            'Generate Config'
                        )
                    );
                };

                (0, _hyperapp.app)(
                    state,
                    actions,
                    view,
                    document.body
                );
            },
            { hyperapp: 8, './options': 5 }
        ],
        9: [
            function(require, module, exports) {
                var global = (1, eval)('this');
                var OldModule = module.bundle.Module;
                function Module() {
                    OldModule.call(this);
                    this.hot = {
                        accept: function(fn) {
                            this._acceptCallback =
                                fn || function() {};
                        },
                        dispose: function(fn) {
                            this._disposeCallback = fn;
                        }
                    };
                }

                module.bundle.Module = Module;

                if (
                    !module.bundle.parent &&
                    typeof WebSocket !== 'undefined'
                ) {
                    var hostname = '' || location.hostname;
                    var ws = new WebSocket(
                        'ws://' + hostname + ':' + '59456' + '/'
                    );
                    ws.onmessage = function(event) {
                        var data = JSON.parse(event.data);

                        if (data.type === 'update') {
                            data.assets.forEach(function(asset) {
                                hmrApply(global.require, asset);
                            });

                            data.assets.forEach(function(asset) {
                                if (!asset.isNew) {
                                    hmrAccept(
                                        global.require,
                                        asset.id
                                    );
                                }
                            });
                        }

                        if (data.type === 'reload') {
                            ws.close();
                            ws.onclose = function() {
                                location.reload();
                            };
                        }

                        if (data.type === 'error-resolved') {
                            console.log('[parcel] ✨ Error resolved');
                        }

                        if (data.type === 'error') {
                            console.error(
                                '[parcel] 🚨  ' +
                                    data.error.message +
                                    '\n' +
                                    'data.error.stack'
                            );
                        }
                    };
                }

                function getParents(bundle, id) {
                    var modules = bundle.modules;
                    if (!modules) {
                        return [];
                    }

                    var parents = [];
                    var k, d, dep;

                    for (k in modules) {
                        for (d in modules[k][1]) {
                            dep = modules[k][1][d];
                            if (
                                dep === id ||
                                (Array.isArray(dep) &&
                                    dep[dep.length - 1] === id)
                            ) {
                                parents.push(+k);
                            }
                        }
                    }

                    if (bundle.parent) {
                        parents = parents.concat(
                            getParents(bundle.parent, id)
                        );
                    }

                    return parents;
                }

                function hmrApply(bundle, asset) {
                    var modules = bundle.modules;
                    if (!modules) {
                        return;
                    }

                    if (modules[asset.id] || !bundle.parent) {
                        var fn = new Function(
                            'require',
                            'module',
                            'exports',
                            asset.generated.js
                        );
                        asset.isNew = !modules[asset.id];
                        modules[asset.id] = [fn, asset.deps];
                    } else if (bundle.parent) {
                        hmrApply(bundle.parent, asset);
                    }
                }

                function hmrAccept(bundle, id) {
                    var modules = bundle.modules;
                    if (!modules) {
                        return;
                    }

                    if (!modules[id] && bundle.parent) {
                        return hmrAccept(bundle.parent, id);
                    }

                    var cached = bundle.cache[id];
                    if (cached && cached.hot._disposeCallback) {
                        cached.hot._disposeCallback();
                    }

                    delete bundle.cache[id];
                    bundle(id);

                    cached = bundle.cache[id];
                    if (
                        cached &&
                        cached.hot &&
                        cached.hot._acceptCallback
                    ) {
                        cached.hot._acceptCallback();
                        return true;
                    }

                    return getParents(global.require, id).some(
                        function(id) {
                            return hmrAccept(global.require, id);
                        }
                    );
                }
            },
            {}
        ]
    },
    {},
    [9, 3]
);
//# sourceMappingURL=/dist/prettier-config.map
