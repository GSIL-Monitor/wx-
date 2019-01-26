webpackJsonp([2,14,15],{

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(285)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(287)
/* template */
var __vue_template__ = __webpack_require__(288)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/view/article/publish.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c98e4284", Component.options)
  } else {
    hotAPI.reload("data-v-c98e4284", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(289)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(291)
/* template */
var __vue_template__ = __webpack_require__(292)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/view/article/edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cc46872a", Component.options)
  } else {
    hotAPI.reload("data-v-cc46872a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 225:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(432)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(434)
/* template */
var __vue_template__ = __webpack_require__(435)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/view/article/article.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ebe79b6", Component.options)
  } else {
    hotAPI.reload("data-v-1ebe79b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 242:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(244)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 244:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 列表页公共属性及方法
 *
 * @function handleSearch()                 // 点击搜索按钮
 * @function handleDel(url)                 // 删除数据
 * @function handleGetSelection()           // 返回复选框选中数据
 * @function handleDel(url)                 // 删除数据
 * @function handleDelMultiple(url,data)    // 删除多条数据
 */

var form_page = {
    data: function data() {
        return {
            loading: false,
            loading_msg: '数据获取中...'
        };
    },
    created: function created() {
        console.log('mixin-form_page');
    },

    methods: {

        /**
         * 返回所选数据，通常用于编辑页
         * @param callback
         * @returns {Promise<any>}
         */
        handleGetData: function handleGetData(callback) {
            var _this = this;

            this.loading = true;
            return new Promise(function (resolve, reject) {
                callback.then(function (res) {
                    _this.loading = false;
                    resolve(res.data);
                }).catch(function (err) {
                    console.log(err);
                    reject(err);
                    _this.loading = false;
                });
            });
        },


        /**
         * 验证表单数据
         * @param formName  表单名
         * @returns {*}
         */
        handleValid: function handleValid() {
            var formName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'form';

            var res = null;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    res = true;
                } else {
                    console.log('error submit!!');
                    res = false;
                }
            });
            return res;
        },


        /**
         * 提交表单数据
         * @param callback 回调函数
         */
        handleSubmit: function handleSubmit(callback) {
            var _this2 = this;

            this.loading = true;
            callback.then(function (res) {
                _this2.loading = false;
                _this2.$message.success(res.data.msg);
                _this2.$emit('render');
                _this2.close();
            }).catch(function (error) {
                console.log(error);
                _this2.loading = false;
                _this2.$message.error('操作失败');
                _this2.close();
            });
        },


        /**
         * 向父组件提交关闭事件
         */
        close: function close() {
            this.$emit('close');
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (form_page);

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(247)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(249)
/* template */
var __vue_template__ = __webpack_require__(260)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2eb7ba3f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/public/table.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2eb7ba3f", Component.options)
  } else {
    hotAPI.reload("data-v-2eb7ba3f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("ff2b3c24", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2eb7ba3f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2eb7ba3f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.el-pagination[data-v-2eb7ba3f]{\n    float: right;\n    margin-top: 8px;\n}\n", ""]);

// exports


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__tools__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fold__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fold___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__fold__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__libs_axios__ = __webpack_require__(26);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 引入tools



/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        url: String,
        columns: Array,
        page: {
            type: Boolean,
            default: true
        },
        checkbox: {
            type: Boolean,
            default: true
        }
    },
    data: function data() {
        return {
            loading: false,
            data: null,
            selection: null,
            filterValue: {
                where: {},
                page: 1,
                limit: 10,
                search: '',
                orderBy: 'id,asc'
            },
            total: 0
        };
    },

    components: { Tools: __WEBPACK_IMPORTED_MODULE_0__tools___default.a, Fold: __WEBPACK_IMPORTED_MODULE_1__fold___default.a },
    created: function created() {
        // 生成动态自定义列
        for (var x in this.columns) {
            if ('render' in this.columns[x]) {
                Vue.component('my-column-' + this.columns[x].prop, this.columns[x].render);
            }
        }
        // 展开列根据层级加上空格
        Vue.component('fold-prefix', {
            render: function render(createElement) {
                return createElement('span', { style: { paddingLeft: this.level * 2 + 'em' } });
            },
            props: { level: { type: Number, required: true } }
        });
        this.renderTable();
    },

    methods: {
        // 展开
        expanding: function expanding(row) {
            row.tree_fold = 'loading';
            this.$emit('children', row);
        },
        // 收起
        collapsing: function collapsing(row) {
            row.tree_fold = 'close';
            this.SetChildren(row, null);
        },
        // 监听Tool事件，抛出到上层处理
        Listeners: function Listeners(type, index, row) {
            this.$emit('tools', type, index, row);
        },
        // 表头筛选项
        filterHandler: function filterHandler(_filters) {
            for (var key in _filters) {
                if (_filters[key] == null || _filters[key].length == 0) {
                    delete this.filterValue.where[key];
                } else {
                    if (_filters[key].length == 1) {
                        this.filterValue.where[key] = _filters[key][0];
                    } else {
                        this.filterValue.where[key] = _filters[key];
                    }
                }
            }
            this.renderTable();
        },

        // 排序
        sortHandler: function sortHandler(obj) {
            if (obj.order == null) {
                this.filterValue.orderBy = null;
            } else {
                this.filterValue.orderBy = obj.prop + ',' + obj.order.slice(0, -6);
            }
            this.renderTable();
        },

        // 页数大小改变
        handleSizeChange: function handleSizeChange(pageSize) {
            this.filterValue.limit = pageSize;
            this.renderTable();
        },

        // 跳页
        handleCurrentChange: function handleCurrentChange(page) {
            this.filterValue.page = page;
            this.renderTable();
        },

        // 复选框操作
        handleSelectionChange: function handleSelectionChange(selection) {
            this.selection = selection;
            this.$emit('SelectionChange', selection);
        },

        // 重载表格数据
        renderTable: function renderTable() {
            var _this = this;

            this.loading = true;
            if (!this.page) {
                delete this.filterValue.page;
                delete this.filterValue.limit;
            }
            __WEBPACK_IMPORTED_MODULE_2__libs_axios__["a" /* default */].get(this.url, {
                params: this.filterValue
            }).then(function (res) {
                _this.total = res.data.count;
                _this.data = res.data.data;
                _this.loading = false;
            }).catch(function (error) {
                _this.loading = false;
                console.log(error);
            });
        },

        // 删除行
        deleteRow: function deleteRow(index) {
            this.data.splice(index, 1);
        },

        // 设置列表树子数据
        SetChildren: function SetChildren(row, children) {
            //this.handleSetTree(this.data,row.id,children);
            var path = row.tree_path;
            var data = this.data;
            for (var i = 0; i < path.length; i++) {
                if (i == 0) {
                    data = data[path[i]];
                } else {
                    data = data['tree_children'][path[i]];
                }
            }
            if (row.tree_fold == 'loading') {
                row.tree_fold = 'open';
            }
            this.$set(data, 'tree_fold', row.tree_fold);
            this.$set(data, 'tree_children', children);
        }
    },
    computed: {
        // 根据树形结构渲染为list结构
        reversedData: function reversedData() {
            var data = this.data;
            data = getChildren(data, [], 0);
            return data;
        }
    }

    // 递归计算list结构
});function getChildren(data, path, level) {
    var field = 'tree_children';
    var return_data = [];
    for (var x in data) {
        data[x]['tree_level'] = level;
        path[level] = x;
        path.length = level + 1;
        data[x]['tree_path'] = path;
        var item = JSON.parse(JSON.stringify(data[x]));
        delete item[field];
        return_data.push(item);
        if (field in data[x]) {
            var children = getChildren(data[x][field], path, level + 1);
            return_data = return_data.concat(children);
        }
    }
    return return_data;
}

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(251)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(253)
/* template */
var __vue_template__ = __webpack_require__(254)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e5030c68"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/public/tools.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e5030c68", Component.options)
  } else {
    hotAPI.reload("data-v-e5030c68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(252);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("50b6e68c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e5030c68\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tools.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e5030c68\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./tools.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "tools",
    props: ['row', 'index', 'buttons'],
    data: function data() {
        return {
            tooltip: { // tooltip默认显示字段
                add: '添加',
                show: '查看详情',
                edit: '编辑',
                delete: '删除'
            }
        };
    },

    methods: {
        handleTools: function handleTools(type) {
            this.$emit('listen-tools', type, this.index, this.row);
        }
    }
});

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-button-group",
    [
      _vm._l(_vm.buttons, function(val, key) {
        return [
          (val.text
          ? val.text
          : _vm.tooltip[key]
            ? _vm.tooltip[key]
            : false)
            ? [
                _c(
                  "el-tooltip",
                  {
                    staticClass: "item",
                    attrs: {
                      effect: "dark",
                      content: val.text ? val.text : _vm.tooltip[key],
                      placement: "bottom"
                    }
                  },
                  [
                    _c("el-button", {
                      attrs: { type: val.type, size: "mini", icon: val.icon },
                      on: {
                        click: function($event) {
                          _vm.handleTools(key)
                        }
                      }
                    })
                  ],
                  1
                )
              ]
            : [
                _c("el-button", {
                  attrs: { type: val.type, size: "mini", icon: val.icon },
                  on: {
                    click: function($event) {
                      _vm.handleTools(key)
                    }
                  }
                })
              ]
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e5030c68", module.exports)
  }
}

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(256)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(258)
/* template */
var __vue_template__ = __webpack_require__(259)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-98a997c0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/public/fold.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-98a997c0", Component.options)
  } else {
    hotAPI.reload("data-v-98a997c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(257);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("328aaa3a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-98a997c0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fold.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-98a997c0\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fold.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "fold",
    props: {
        row: {
            type: Object
        },
        status: {
            default: 'close'
        }
    },
    data: function data() {
        return {
            state: this.status,
            className: {
                open: 'el-icon-caret-bottom',
                close: 'el-icon-caret-right',
                loading: 'el-icon-loading'
            }
        };
    },

    methods: {
        handleFold: function handleFold() {
            if (this.status == 'open') {
                this.$emit('collapsing', this.row); // 收起
            } else {
                this.state = 'loading';
                this.$emit('expanding', this.row); // 展开
            }
        }
    },
    watch: {
        status: function status(val) {
            this.state = val;
        }
    }
});

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("i", {
    class: _vm.className[this.state],
    staticStyle: { cursor: "pointer" },
    on: { click: _vm.handleFold }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-98a997c0", module.exports)
  }
}

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "el-table",
        {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.loading,
              expression: "loading"
            }
          ],
          attrs: { border: "", data: _vm.reversedData, size: "mini" },
          on: {
            "filter-change": _vm.filterHandler,
            "sort-change": _vm.sortHandler,
            "selection-change": _vm.handleSelectionChange
          }
        },
        [
          _vm.checkbox
            ? _c("el-table-column", {
                attrs: { type: "selection", width: "55" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._l(_vm.columns, function(item) {
            return [
              _c("el-table-column", {
                ref: "col-" + item.prop,
                refInFor: true,
                attrs: {
                  width: item.width ? item.width : null,
                  prop: item.prop,
                  "column-key": item.prop,
                  label: item.label,
                  sortable: item.sort ? "custom" : false,
                  filters: item.filter ? item.filter.data : null,
                  "filter-multiple": item.filter
                    ? item.filter.multiple === false
                      ? item.filter.multiple
                      : true
                    : true
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(scope) {
                      return [
                        "tools" in item
                          ? [
                              _c("Tools", {
                                attrs: {
                                  buttons: item.tools,
                                  row: scope.row,
                                  index: scope.$index
                                },
                                on: { "listen-tools": _vm.Listeners }
                              })
                            ]
                          : "render" in item
                            ? [
                                _c("my-column-" + item.prop, {
                                  tag: "component",
                                  attrs: { row: scope.row }
                                })
                              ]
                            : [
                                "lazy" in item
                                  ? _c("fold-prefix", {
                                      attrs: {
                                        level: scope.row.tree_level
                                          ? scope.row.tree_level
                                          : 0
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(" "),
                                "lazy" in item && scope.row.children_count > 0
                                  ? _c("Fold", {
                                      attrs: {
                                        status: scope.row.tree_fold,
                                        row: scope.row
                                      },
                                      on: {
                                        expanding: _vm.expanding,
                                        collapsing: _vm.collapsing
                                      }
                                    })
                                  : _vm._e(),
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(
                                      item.convert
                                        ? scope.row[item.prop + "_name"]
                                        : scope.row[item.prop]
                                    ) +
                                    "\n                        "
                                )
                              ]
                      ]
                    }
                  }
                ])
              })
            ]
          })
        ],
        2
      ),
      _vm._v(" "),
      _vm.page
        ? _c("el-pagination", {
            attrs: {
              "page-sizes": [10, 20, 30, 50],
              "page-size": _vm.filterValue.limit,
              "current-page": _vm.filterValue.page,
              layout: "total, sizes, prev, pager, next, jumper",
              total: _vm.total
            },
            on: {
              "size-change": _vm.handleSizeChange,
              "current-change": _vm.handleCurrentChange
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2eb7ba3f", module.exports)
  }
}

/***/ }),

/***/ 261:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 列表页公共属性及方法
 */

var list_page = {
    data: function data() {
        return {
            search: {},
            edit_id: null,
            tools_id: null,
            select_ids: null
        };
    },
    created: function created() {
        //console.log('mixin-list_page')
    },

    methods: {
        /**
         * 点击搜索按钮
         */
        handleSearch: function handleSearch() {
            this.handleSetFilter('search', this.search);
            this.handleRenderTable();
        },


        /**
         * 返回所选数据
         * @param field 要返回的字段名，为null则全部返回
         * @returns {*}
         */
        handleGetSelection: function handleGetSelection() {
            var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            var data = this.$refs.table.selection;
            if (data === null) {
                data = [];
            }
            if (field == null) {
                return data;
            } else if (typeof field == 'string') {
                var value = [];
                data.forEach(function (item) {
                    if (field in item) {
                        value.push(item[field]);
                    }
                });
                return value;
            } else {
                console.error('handleGetSelection 参数错误');
            }
            return this.$refs.table.selection;
        },


        /**
         * 设置表格筛选参数
         * @param key   键
         * @param value 值
         */
        handleSetFilter: function handleSetFilter(key, value) {
            this.$refs.table.filterValue[key] = value;
        },


        /**
         * 获取表格筛选参数
         * @param key   键
         * @returns {*}
         */
        handleGetFilter: function handleGetFilter(key) {
            return this.$refs.table.filterValue[key];
        },


        /**
         * 重新渲染表格
         */
        handleRenderTable: function handleRenderTable() {
            this.$refs.table.renderTable();
        },


        /**
         * 移除表格中某行数据
         * @param index 下标
         */
        handleDeleteRow: function handleDeleteRow(index) {
            this.$refs.table.deleteRow(index);
        },


        /**
         * 删除数据
         * @param callback  删除操作
         * @param index     下标
         */
        handleDel: function handleDel(callback, index) {
            var _this = this;

            var loading = this.$loading({
                lock: true,
                text: '删除数据中...',
                spinner: 'el-icon-loading'
            });
            callback.then(function (res) {
                _this.loading = false;
                if (res['msg'] == 0) {
                    _this.$message.success('删除成功');
                    _this.handleDeleteRow(index);
                } else {
                    _this.$message.success('删除成功');
                }
                loading.close();
            }).catch(function (error) {
                _this.loading = false;
                _this.$message.error('删除失败');
                loading.close();
                console.log(error);
            });
        },


        /**
         * 设置子集数据，treeTable
         * @param row
         * @param children
         */
        handleSetChild: function handleSetChild(row, children) {
            this.$refs.table.SetChildren(row, children);
        },

        /**
         * 开启表格loading
         */
        handleOpenTableLoding: function handleOpenTableLoding() {
            this.$refs.table.loading = true;
        },


        /**
         * 关闭表格loading
         */
        handleCloseTableLoding: function handleCloseTableLoding() {
            this.$refs.table.loading = false;
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (list_page);

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(265)
}
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(267)
/* template */
var __vue_template__ = __webpack_require__(268)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/public/upload.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13e25f40", Component.options)
  } else {
    hotAPI.reload("data-v-13e25f40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

module.exports=__webpack_require__(270)

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getConfigArray; });
/* unused harmony export getConfigValue */
/* unused harmony export getConfigKey */
/**
 * 系统配置数据
 * @description
 */

var data = {
    /**
     * @description 性别
     */
    sex: [{ key: 1, value: '男' }, { key: 2, value: '女' }, { key: 0, value: '未填写' }],
    /**
     * @description 用户类型
     */
    user_type: [{ key: 0, value: '管理员' }, { key: 1, value: '普通用户' }],
    /**
     * @description 用户状态
     */
    user_state: [{ key: 0, value: '禁用' }, { key: 1, value: '正常' }],
    /**
     * @description 权限类型
     */
    auth_type: [{ key: 0, value: '接口' }, { key: 1, value: '前端路由' }],
    /**
     * @description 角色状态
     */
    role_state: [{ key: 0, value: '禁用' }, { key: 1, value: '正常' }],

    /**
     * @description 角色状态
     */
    config_type: [{ key: 0, value: 'TEXT' }, { key: 1, value: 'JSON' }]

};

/**
 * 通过Key获取配置数据
 * @param key,[key],[value]
 * @returns array
 *
 */
var getConfigArray = function getConfigArray(keyword) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text';

    var res = data[keyword];
    if (key == 'key' && value == 'value') {
        return res;
    }
    var new_res = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = res[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var obj = _step.value;

            var item = {};
            item[key] = obj.key;

            item[value] = obj.value;
            new_res.push(item);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return new_res;
};

/**

 * 通过key获取value
 * @param key
 * @param name
 * @returns {*}
 */
var getConfigValue = function getConfigValue(keyword, key) {
    var value = void 0;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = data[keyword][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var obj = _step2.value;

            if (obj.key == key) {
                value = obj.value;
                break;
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return value;
};
/**
 * 通过value获取key
 * @param key
 * @param value
 * @returns {*}
 */
var getConfigKey = function getConfigKey(keyword, value) {
    var key = void 0;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = data[keyword][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var obj = _step3.value;

            if (obj.value == value) {
                key = obj.key;
                break;
            }
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return key;
};

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(266);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("5a247739", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13e25f40\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-13e25f40\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./upload.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 100px;\n    height: 100px;\n    line-height: 100px;\n    text-align: center;\n}\n.avatar {\n    width: 100px;\n    height: 100px;\n    display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            imageUrl: '',
            upload_url: "/api/upload",
            headers: {
                Authorization: 'Bearer ' + this.$store.state.user.token
            }
        };
    },

    props: ['img'],
    created: function created() {
        this.imageUrl = this.img;
    },
    watch: {
        img: function img(old) {
            this.imageUrl = old;
        }
    },
    methods: {
        handleAvatarSuccess: function handleAvatarSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.imageUrl = URL.createObjectURL(file.raw);
            this.$emit('img-success', response.url);
        },
        beforeAvatarUpload: function beforeAvatarUpload(file) {
            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        }
    }
});

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-upload",
    {
      staticClass: "avatar-uploader",
      attrs: {
        action: _vm.upload_url,
        headers: _vm.headers,
        "show-file-list": false,
        "on-success": _vm.handleAvatarSuccess,
        "before-upload": _vm.beforeAvatarUpload
      }
    },
    [
      _vm.imageUrl
        ? _c("img", { staticClass: "avatar", attrs: { src: _vm.imageUrl } })
        : _c("i", { staticClass: "el-icon-plus avatar-uploader-icon" })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-13e25f40", module.exports)
  }
}

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return category_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return category_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return category_edit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var getList = function getList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/list',
        method: 'get'
    });
};
var category_del = function category_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/del/' + id,
        method: 'get'
    });
};
var category_add = function category_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/add',
        data: data,
        method: 'post'
    });
};
var category_edit = function category_edit(data, id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/category/edit/' + id,
        data: data,
        method: 'post'
    });
};

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(242)
/* script */
var __vue_script__ = __webpack_require__(271)
/* template */
var __vue_template__ = __webpack_require__(272)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "node_modules/vue-ueditor-wrap/lib/index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a64a0188", Component.options)
  } else {
    hotAPI.reload("data-v-a64a0188", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
//
//
//

// 一个简单的事件订阅发布的实现,取代原始Event对象,提升IE下的兼容性
var LoadEvent = function () {
  function LoadEvent() {
    _classCallCheck(this, LoadEvent);

    this.listeners = {};
  }

  _createClass(LoadEvent, [{
    key: 'on',
    value: function on(eventName, callback) {
      this.listeners[eventName] === undefined ? this.listeners[eventName] = [] : '';
      this.listeners[eventName].push(callback);
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      this.listeners[eventName] && this.listeners[eventName].forEach(function (callback) {
        return callback();
      });
    }
  }]);

  return LoadEvent;
}();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueUeditorWrap',
  data: function data() {
    return {
      id: 'editor' + Math.random().toString().slice(-10),
      editor: null,
      status: 0,
      initValue: '',
      defaultConfig: {
        UEDITOR_HOME_URL: './static/UEditor/',
        enableAutoSave: false
      }
    };
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    init: {
      type: Function,
      default: function _default() {
        return function () {};
      }
    },
    destroy: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    mixedConfig: function mixedConfig() {
      return Object.assign({}, this.defaultConfig, this.config);
    }
  },
  methods: {
    // 添加自定义按钮
    registerButton: function registerButton(_ref) {
      var name = _ref.name,
          icon = _ref.icon,
          tip = _ref.tip,
          handler = _ref.handler,
          _ref$UE = _ref.UE,
          UE = _ref$UE === undefined ? window.UE : _ref$UE;

      UE.registerUI(name, function (editor, name) {
        editor.registerCommand(name, {
          execCommand: function execCommand() {
            handler(editor, name);
          }
        });
        var btn = new UE.ui.Button({
          name: name,
          title: tip,
          cssRules: 'background-image: url(' + icon + ') !important;background-size: cover;',
          onclick: function onclick() {
            editor.execCommand(name);
          }
        });
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(name);
          if (state === -1) {
            btn.setDisabled(true);
            btn.setChecked(false);
          } else {
            btn.setDisabled(false);
            btn.setChecked(state);
          }
        });
        return btn;
      });
    },
    // 实例化编辑器
    _initEditor: function _initEditor() {
      var _this = this;

      this.$nextTick(function () {
        _this.init();
        _this.editor = window.UE.getEditor(_this.id, _this.mixedConfig);
        _this.editor.addListener('ready', function () {
          _this.status = 2;
          _this.editor.setContent(_this.initValue);
          _this.$emit('ready', _this.editor);
          _this.editor.addListener('contentChange', function () {
            _this.$emit('input', _this.editor.getContent());
          });
        });
      });
    },

    // 检测依赖,确保 UEditor 资源文件已加载完毕
    _checkDependencies: function _checkDependencies() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        // 判断ueditor.config.js和ueditor.all.js是否均已加载(仅加载完ueditor.config.js时UE对象和UEDITOR_CONFIG对象存在,仅加载完ueditor.all.js时UEDITOR_CONFIG对象存在,但为空对象)
        var scriptsLoaded = !!window.UE && !!window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0 && !!window.UE.getEditor;
        if (scriptsLoaded) {
          resolve();
        } else if (window.loadEnv) {
          // 利用订阅发布，确保同时渲染多个组件时，不会重复创建script标签
          window.loadEnv.on('scriptsLoaded', function () {
            resolve();
          });
        } else {
          window.loadEnv = new LoadEvent();
          // 如果在其他地方只引用ueditor.all.min.js，在加载ueditor.config.js之后仍需要重新加载ueditor.all.min.js，所以必须确保ueditor.config.js已加载
          _this2._loadConfig().then(function () {
            return _this2._loadCore();
          }).then(function () {
            resolve();
            window.loadEnv.emit('scriptsLoaded');
          });
        }
      });
    },
    _loadConfig: function _loadConfig() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
          resolve();
          return;
        }
        var configScript = document.createElement('script');
        configScript.type = 'text/javascript';
        configScript.src = _this3.mixedConfig.UEDITOR_HOME_URL + 'ueditor.config.js';
        document.getElementsByTagName('head')[0].appendChild(configScript);
        configScript.onload = function () {
          if (window.UE && window.UEDITOR_CONFIG && Object.keys(window.UEDITOR_CONFIG).length !== 0) {
            resolve();
          } else {
            console.error('加载ueditor.config.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', configScript.src);
          }
        };
      });
    },
    _loadCore: function _loadCore() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (window.UE && window.UE.getEditor) {
          resolve();
          return;
        }
        var coreScript = document.createElement('script');
        coreScript.type = 'text/javascript';
        coreScript.src = _this4.mixedConfig.UEDITOR_HOME_URL + 'ueditor.all.min.js';
        document.getElementsByTagName('head')[0].appendChild(coreScript);
        coreScript.onload = function () {
          if (window.UE && window.UE.getEditor) {
            resolve();
          } else {
            console.error('加载ueditor.all.min.js失败,请检查您的配置地址UEDITOR_HOME_URL填写是否正确!\n', coreScript.src);
          }
        };
      });
    },

    // 设置内容
    _setContent: function _setContent(value) {
      value === this.editor.getContent() || this.editor.setContent(value);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.destroy && this.editor && this.editor.destroy) this.editor.destroy();
  },

  // v-model语法糖实现
  watch: {
    value: {
      handler: function handler(value) {
        var _this5 = this;

        // 0: 尚未初始化 1: 开始初始化但尚未ready 2 初始化完成并已ready
        switch (this.status) {
          case 0:
            this.status = 1;
            this.initValue = value;
            this._checkDependencies().then(function () {
              return _this5._initEditor();
            });
            break;
          case 1:
            this.initValue = value;
            break;
          case 2:
            this._setContent(value);
            break;
          default:
            break;
        }
      },

      immediate: true
    }
  }
});

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("script", {
    attrs: { id: _vm.id, name: _vm.name, type: "text/plain" }
  })
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a64a0188", module.exports)
  }
}

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return template_del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return template_add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return template_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return template_edit; });
/* unused harmony export template_getList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var template_del = function template_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/del/' + id,
        method: 'get'
    });
};
var template_add = function template_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/add',
        data: data,
        method: 'post'
    });
};
var template_get = function template_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/' + id,
        method: 'get'
    });
};
var template_edit = function template_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/edit/' + id,
        data: data,
        method: 'post'
    });
};
var template_getList = function template_getList() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/template/list',
        method: 'get'
    });
};

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return article_add; });
/* unused harmony export sitemap */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return clean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return article_get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return article_edit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return article_del; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_axios__ = __webpack_require__(26);


var article_add = function article_add(data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/add',
        data: data,
        method: 'post'
    });
};

var sitemap = function sitemap() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/sitemap',
        method: 'get'
    });
};
var clean = function clean() {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/clean',
        method: 'get'
    });
};

var article_get = function article_get(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/' + id,
        method: 'get'
    });
};
var article_edit = function article_edit(id, data) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/edit/' + id,
        data: data,
        method: 'post'
    });
};
var article_del = function article_del(id) {
    return __WEBPACK_IMPORTED_MODULE_0__libs_axios__["a" /* default */].request({
        url: '/article/del/' + id,
        method: 'get'
    });
};

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(286);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("e0edb748", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c98e4284\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./publish.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-c98e4284\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./publish.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.left {\n    float: left;\n    width: 65%;\n}\n.right {\n    width: 30%;\n    float: right;\n}\n.edui-editor {\n    width: 100% !important;\n}\n.edui-editor-iframeholder {\n    width: 100% !important;\n}\n.text {\n    font-size: 14px;\n}\n.item {\n    margin-bottom: 18px;\n}\n.clearfix:before,\n.clearfix:after {\n    display: table;\n    content: \"\";\n}\n.clearfix:after {\n    clear: both\n}\n.box-card {\n    width: 480px;\n}\n", ""]);

// exports


/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_public_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_article__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_category__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_articleTemplate__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    name: "publish",
    data: function data() {
        return {
            articleForm: {
                random_jump: "1", //开启随机跳转
                is_wechat: "1", //是否是微信浏览器
                title: '', //文章标题
                description: '', //文章描述
                content: '', //文章内容
                arrow: '', //点击箭头返回
                physics: '', //物理按键点击返回
                photo: '', //文章封面
                url: '', //文章访问链接
                category: [], //文章分类
                music: "", //背景地址
                appid: "", //微信Id
                key: "", //微信密匙
                right_now: "", //网站立即跳转到指定地址
                cnzz: "" //文章流量统计
            },
            rules: {
                title: [{ required: true, message: '文章标题为必填项目', trigger: 'blur' }],
                content: [{ required: true, message: '文章内容为必填项目', trigger: 'blur' }],
                url: [{ required: true, message: '文章访问链接必选填写', trigger: 'blur' }]
            },
            options: [],
            Ueconfig: {
                serverUrl: '/static/UEditor/php/controller.php'
            }
        };
    },

    created: function created() {
        var _this = this;

        //获得分类列表
        Object(__WEBPACK_IMPORTED_MODULE_3__api_category__["d" /* getList */])().then(function (response) {
            _this.options = response.data.data;
        });
    },
    methods: {
        onSubmit: function onSubmit(articleForm) {
            var _this2 = this;

            if (this.handleValid(articleForm)) {
                Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["a" /* article_add */])(this.articleForm).then(function (response) {
                    _this2.$message.success(response.data.msg);
                    _this2.$router.push('/article_list');
                });
            }
        },
        success: function success(value) {
            this.articleForm.photo = value;
        }
    },
    components: {
        upload: __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default.a, VueUeditorWrap: __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap___default.a
    }

});

/***/ }),

/***/ 288:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "left", staticStyle: { width: "65%" } },
      [
        _c(
          "el-form",
          {
            ref: "articleForm",
            staticClass: "demo-ruleForm",
            attrs: {
              model: _vm.articleForm,
              rules: _vm.rules,
              "label-width": "100px"
            }
          },
          [
            _c(
              "el-form-item",
              { attrs: { label: "文章标题", prop: "title" } },
              [
                _c("el-input", {
                  model: {
                    value: _vm.articleForm.title,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "title", $$v)
                    },
                    expression: "articleForm.title"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章内容", prop: "content" } },
              [
                _c("vue-ueditor-wrap", {
                  attrs: { config: _vm.Ueconfig },
                  model: {
                    value: _vm.articleForm.content,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "content", $$v)
                    },
                    expression: "articleForm.content"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章描述", prop: "description" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "文章描述" },
                  model: {
                    value: _vm.articleForm.description,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "description", $$v)
                    },
                    expression: "articleForm.description"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "访问链接", prop: "url" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "当前文章的访问URL地址必选" },
                  model: {
                    value: _vm.articleForm.url,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "url", $$v)
                    },
                    expression: "articleForm.url"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章分类", prop: "category" } },
              [
                _c("el-cascader", {
                  attrs: {
                    "expand-trigger": "click",
                    options: _vm.options,
                    placeholder: "发表文章需要选择一个分类"
                  },
                  model: {
                    value: _vm.articleForm.category,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "category", $$v)
                    },
                    expression: "articleForm.category"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "封面图片", prop: "photo" } },
              [
                _c("upload", {
                  attrs: { img: _vm.articleForm.photo },
                  on: { "img-success": _vm.success }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary" },
                    on: {
                      click: function($event) {
                        _vm.onSubmit("articleForm")
                      }
                    }
                  },
                  [_vm._v("立即发表")]
                ),
                _vm._v(" "),
                _c("el-button", { on: { click: _vm.close } }, [_vm._v("取消")])
              ],
              1
            )
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "right" },
      [
        _c("el-card", { staticClass: "box-card" }, [
          _c(
            "div",
            {
              staticClass: "clearfix",
              attrs: { slot: "header" },
              slot: "header"
            },
            [_c("span", [_vm._v("其他选项")])]
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "微信appId" },
                model: {
                  value: _vm.articleForm.appid,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "appid", $$v)
                  },
                  expression: "articleForm.appid"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "微信密匙" },
                model: {
                  value: _vm.articleForm.key,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "key", $$v)
                  },
                  expression: "articleForm.key"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "第三方流量统计" },
                model: {
                  value: _vm.articleForm.cnzz,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "cnzz", $$v)
                  },
                  expression: "articleForm.cnzz"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "背景音乐" },
                model: {
                  value: _vm.articleForm.music,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "music", $$v)
                  },
                  expression: "articleForm.music"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "文章立即跳转到指定地址" },
                model: {
                  value: _vm.articleForm.right_now,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "right_now", $$v)
                  },
                  expression: "articleForm.right_now"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "点击文章箭头返回" },
                model: {
                  value: _vm.articleForm.arrow,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "arrow", $$v)
                  },
                  expression: "articleForm.arrow"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "物理按键点击返回" },
                model: {
                  value: _vm.articleForm.physics,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "physics", $$v)
                  },
                  expression: "articleForm.physics"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c(
                "el-checkbox",
                {
                  attrs: { "true-label": "1", "false-label": "0" },
                  model: {
                    value: _vm.articleForm.is_wechat,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_wechat", $$v)
                    },
                    expression: "articleForm.is_wechat"
                  }
                },
                [_vm._v("开启微信检测")]
              ),
              _vm._v(" "),
              _c(
                "el-checkbox",
                {
                  attrs: { "true-label": "1", "false-label": "0" },
                  model: {
                    value: _vm.articleForm.random_jump,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "random_jump", $$v)
                    },
                    expression: "articleForm.random_jump"
                  }
                },
                [_vm._v("开启随机跳转")]
              )
            ],
            1
          )
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c98e4284", module.exports)
  }
}

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(290);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("0bdf0b41", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc46872a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-cc46872a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.left{\n    float: left;\n    width: 65%;\n}\n.right{\n    width: 30%;\n    float: right;\n}\n.edui-editor{\n    width: 100%!important;\n}\n.text {\n    font-size: 14px;\n}\n.item {\n    margin-bottom: 18px;\n}\n.clearfix:before,\n.clearfix:after {\n    display: table;\n    content: \"\";\n}\n.clearfix:after {\n    clear: both\n}\n.box-card {\n    width: 480px;\n}\n.edui-editor-iframeholder {\n    width: 100%!important;\n}\n", ""]);

// exports


/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_form_page__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_public_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_article__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_articleTemplate__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_category__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_form_page__["a" /* default */]],
    name: "publish",
    data: function data() {
        return {
            articleForm: {
                random_jump: "1", //开启随机跳转
                is_wechat: "1", //是否是微信浏览器
                title: '', //文章标题
                description: '', //文章描述
                content: '', //文章内容
                arrow: '', //点击箭头返回
                physics: '', //物理按键点击返回
                photo: '', //文章封面
                url: '', //文章访问链接
                category: [], //文章分类
                music: "", //背景地址
                appid: "", //微信Id
                key: "", //微信密匙
                right_now: "", //网站立即跳转到指定地址
                cnzz: "" //文章流量统计
            },
            rules: {
                title: [{ required: true, message: '文章标题为必填项目', trigger: 'blur' }],
                content: [{ required: true, message: '文章内容为必填项目', trigger: 'blur' }],
                url: [{ required: true, message: '文章访问链接必选填写', trigger: 'blur' }]
            },
            options: [],
            Ueconfig: {
                serverUrl: '/static/UEditor/php/controller.php'
            }
        };
    },

    methods: {
        //提交数据
        onSubmit: function onSubmit(articleForm) {
            var _this = this;

            if (this.handleValid(articleForm)) {
                Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["c" /* article_edit */])(this.$route.params.id, this.articleForm).then(function (response) {
                    //响应成功消息
                    _this.$message.success(response.data.msg);
                    //跳转到文章列表页面
                    _this.$router.push('/article_list');
                });
            }
        },
        success: function success(value) {
            //图片上传成功 和form表单的元素做一个绑定 回显图片数据
            this.articleForm.photo = value;
        }
    },
    components: {
        upload: __WEBPACK_IMPORTED_MODULE_1__components_public_upload___default.a, VueUeditorWrap: __WEBPACK_IMPORTED_MODULE_5_vue_ueditor_wrap___default.a
    },
    created: function created() {
        var _this2 = this;

        //获得分类列表
        Object(__WEBPACK_IMPORTED_MODULE_4__api_category__["d" /* getList */])().then(function (response) {
            _this2.options = response.data.data;
        });
        //文章数据
        Object(__WEBPACK_IMPORTED_MODULE_2__api_article__["d" /* article_get */])(this.$route.params.id).then(function (response) {
            _this2.articleForm = response.data.data;
            _this2.articleForm.template_id = response.data.data.template_id;
            _this2.articleForm.category = response.data.data.category_id;
        });
    }

});

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "left", staticStyle: { width: "65%" } },
      [
        _c(
          "el-form",
          {
            ref: "articleForm",
            staticClass: "demo-ruleForm",
            attrs: {
              model: _vm.articleForm,
              rules: _vm.rules,
              "label-width": "100px"
            }
          },
          [
            _c(
              "el-form-item",
              { attrs: { label: "文章标题", prop: "title" } },
              [
                _c("el-input", {
                  model: {
                    value: _vm.articleForm.title,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "title", $$v)
                    },
                    expression: "articleForm.title"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章内容", prop: "content" } },
              [
                _c("vue-ueditor-wrap", {
                  attrs: { config: _vm.Ueconfig },
                  model: {
                    value: _vm.articleForm.content,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "content", $$v)
                    },
                    expression: "articleForm.content"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章描述", prop: "description" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "文章描述" },
                  model: {
                    value: _vm.articleForm.description,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "description", $$v)
                    },
                    expression: "articleForm.description"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "访问链接", prop: "url" } },
              [
                _c("el-input", {
                  attrs: { placeholder: "当前文章的访问URL地址必选" },
                  model: {
                    value: _vm.articleForm.url,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "url", $$v)
                    },
                    expression: "articleForm.url"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "文章分类", prop: "category" } },
              [
                _c("el-cascader", {
                  attrs: {
                    "expand-trigger": "click",
                    options: _vm.options,
                    placeholder: "发表文章需要选择一个分类"
                  },
                  model: {
                    value: _vm.articleForm.category,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "category", $$v)
                    },
                    expression: "articleForm.category"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              { attrs: { label: "封面图片", prop: "photo" } },
              [
                _c("upload", {
                  attrs: { img: _vm.articleForm.photo },
                  on: { "img-success": _vm.success }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "el-form-item",
              [
                _c(
                  "el-button",
                  {
                    attrs: { type: "primary" },
                    on: {
                      click: function($event) {
                        _vm.onSubmit("articleForm")
                      }
                    }
                  },
                  [_vm._v("立即发表")]
                ),
                _vm._v(" "),
                _c("el-button", { on: { click: _vm.close } }, [_vm._v("取消")])
              ],
              1
            )
          ],
          1
        )
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "right" },
      [
        _c("el-card", { staticClass: "box-card" }, [
          _c(
            "div",
            {
              staticClass: "clearfix",
              attrs: { slot: "header" },
              slot: "header"
            },
            [_c("span", [_vm._v("其他选项")])]
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "微信appId" },
                model: {
                  value: _vm.articleForm.appid,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "appid", $$v)
                  },
                  expression: "articleForm.appid"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "微信密匙" },
                model: {
                  value: _vm.articleForm.key,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "key", $$v)
                  },
                  expression: "articleForm.key"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "第三方流量统计" },
                model: {
                  value: _vm.articleForm.cnzz,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "cnzz", $$v)
                  },
                  expression: "articleForm.cnzz"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "背景音乐" },
                model: {
                  value: _vm.articleForm.music,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "music", $$v)
                  },
                  expression: "articleForm.music"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "文章立即跳转到指定地址" },
                model: {
                  value: _vm.articleForm.right_now,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "right_now", $$v)
                  },
                  expression: "articleForm.right_now"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "点击文章箭头返回" },
                model: {
                  value: _vm.articleForm.arrow,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "arrow", $$v)
                  },
                  expression: "articleForm.arrow"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c("el-input", {
                attrs: { placeholder: "物理按键点击返回" },
                model: {
                  value: _vm.articleForm.physics,
                  callback: function($$v) {
                    _vm.$set(_vm.articleForm, "physics", $$v)
                  },
                  expression: "articleForm.physics"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "p",
            [
              _c(
                "el-checkbox",
                {
                  attrs: { "true-label": "1", "false-label": "0" },
                  model: {
                    value: _vm.articleForm.is_wechat,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "is_wechat", $$v)
                    },
                    expression: "articleForm.is_wechat"
                  }
                },
                [_vm._v("开启微信检测")]
              ),
              _vm._v(" "),
              _c(
                "el-checkbox",
                {
                  attrs: { "true-label": "1", "false-label": "0" },
                  model: {
                    value: _vm.articleForm.random_jump,
                    callback: function($$v) {
                      _vm.$set(_vm.articleForm, "random_jump", $$v)
                    },
                    expression: "articleForm.random_jump"
                  }
                },
                [_vm._v("开启随机跳转")]
              )
            ],
            1
          )
        ])
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-cc46872a", module.exports)
  }
}

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(433);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(243)("04883668", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ebe79b6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./article.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1ebe79b6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./article.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 433:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(79)(false);
// imports


// module
exports.push([module.i, "\n.el-input__inner {\n    height: 35px;\n}\n", ""]);

// exports


/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_public_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_public_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__publish__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__publish___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__publish__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__edit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__edit__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_list_page__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_sys_config__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api_article__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_category__ = __webpack_require__(269);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
    components: { Table: __WEBPACK_IMPORTED_MODULE_0__components_public_table___default.a, Add: __WEBPACK_IMPORTED_MODULE_1__publish___default.a, Edit: __WEBPACK_IMPORTED_MODULE_2__edit___default.a },
    mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_list_page__["a" /* default */]],
    data: function data() {
        return {
            page_name: '文章',
            url: 'article/list',
            addFormVisible: false,
            editFormVisible: false,
            columns: [{
                prop: 'id',
                label: 'ID',
                sort: true,
                width: '80'
            }, {
                prop: 'title',
                label: '文章标题',
                search: true,
                render: {
                    props: {
                        row: Object // 接受当前行参数
                    },
                    render: function render(createElement) {
                        return createElement('a', {
                            attrs: {
                                href: this.row.url_home,
                                target: '_blank'
                            },
                            style: {
                                textDecoration: 'none'
                            }
                        }, this.row.title);
                    }
                }
            }, {
                prop: 'author',
                label: '文章作者',
                width: '180'
            }, {
                prop: 'category',
                label: '分类',
                width: '180'
            }, {
                prop: 'status',
                label: 'appId/音乐/封面',
                width: '120',
                render: {
                    props: {
                        row: Object // 接受当前行参数
                    },
                    render: function render(createElement) {
                        // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                        return createElement('div', [createElement('span', {
                            style: {
                                color: this.row.status.appid.color,
                                fontSize: '30px',
                                padding: '5px'
                            }
                        }, this.row.status.appid.status), createElement('span', {
                            style: {
                                color: this.row.status.music.color,
                                fontSize: '30px',
                                padding: '5px'
                            }
                        }, this.row.status.music.status), createElement('span', {
                            style: {
                                color: this.row.status.photo.color,
                                fontSize: '30px',
                                padding: '5px'
                            }
                        }, this.row.status.photo.status)]);
                    }
                }
            }, {
                prop: 'other',
                label: '箭头返回/按键返回/立即跳转',
                width: '180',
                render: {
                    props: {
                        row: Object // 接受当前行参数
                    },
                    render: function render(createElement) {
                        // 参考链接 https://cn.vuejs.org/v2/guide/render-function.html#%E8%99%9A%E6%8B%9F-DOM
                        return createElement('div', [createElement('span', {
                            style: {
                                color: this.row.other.arrow.color,
                                fontSize: '30px',
                                paddingLeft: '20px'
                            }
                        }, this.row.other.arrow.status), createElement('span', {
                            style: {
                                color: this.row.other.physics.color,
                                fontSize: '30px',
                                paddingLeft: '20px'
                            }
                        }, this.row.other.physics.status), createElement('span', {
                            style: {
                                color: this.row.other.right_now.color,
                                fontSize: '30px',
                                paddingLeft: '20px'
                            }
                        }, this.row.other.right_now.status)]);
                    }
                }
            }, {
                prop: 'click',
                label: '点击量',
                sort: true,
                width: '100'
            }, {
                prop: 'publish_time',
                label: '发布日期',
                sort: true,
                width: '120'
            }, {
                label: '操作',
                width: '200',
                tools: this.handleGetBtn()
            }],
            articleAuth: [{
                add: false
            }],
            options: [],
            selectedOptions: []
        };
    },

    created: function created() {
        var _this = this;

        var article_Auth = this.$store.state.user.auth.article_list;
        article_Auth.forEach(function (value) {
            if (value === 'add') {
                _this.articleAuth.add = true;
                return true;
            }
        });
        Object(__WEBPACK_IMPORTED_MODULE_6__api_category__["d" /* getList */])().then(function (response) {
            _this.options = response.data.data;
        });
    },
    methods: {
        // 工具栏事件处理 type值为columns中tools的键值
        handleTools: function handleTools(type, index, row) {
            var _this2 = this;

            if (type == 'edit') {
                //编辑数据
                this.handleEdit(row.id);
            } else if (type == 'delete') {
                //删除数据
                Object(__WEBPACK_IMPORTED_MODULE_5__api_article__["b" /* article_del */])(row.id).then(function (response) {
                    //成功响应动态移除表格项
                    _this2.handleDeleteRow(index);
                    //提示信息
                    _this2.$message.success(response.data.msg);
                });
            } else {
                console.error('Tools Event:' + type + ' Not found');
            }
        },
        cleanCache: function cleanCache(value) {
            var _this3 = this;

            Object(__WEBPACK_IMPORTED_MODULE_5__api_article__["e" /* clean */])().then(function (response) {
                _this3.$message.success(response.data.msg);
            });
        },
        handleAdd: function handleAdd() {
            //跳转到发布文章页面
            this.$router.push('/publish_article');
        },
        handleEdit: function handleEdit(id) {
            //跳转到文章编辑页面,带上需要编辑的文章id
            this.$router.push({
                name: 'article_edit',
                params: {
                    id: id
                }
            });
        },

        //过滤文章分类
        handleChange: function handleChange(value) {
            this.handleSetFilter('where', { category: value[value.length - 1] });
            this.handleRenderTable();
        },

        //tool栏按钮权限控制
        handleGetBtn: function handleGetBtn() {
            var conf = {
                edit: {
                    type: 'primary',
                    icon: 'el-icon-edit'
                },

                delete: {
                    type: 'danger',
                    icon: 'el-icon-delete'
                }
            };
            var result = {};
            this.$store.state.user.auth.article_list.forEach(function (item) {
                if (item in conf) {
                    result[item] = conf[item];
                }
            });
            return result;
        }
    }
});

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticStyle: { margin: "8px 0" } },
        [
          _c(
            "el-row",
            [
              _c(
                "el-col",
                { attrs: { span: 14 } },
                [
                  this.articleAuth.add
                    ? [
                        _c(
                          "el-button",
                          {
                            attrs: {
                              type: "primary",
                              size: "small",
                              icon: "el-icon-plus"
                            },
                            on: { click: _vm.handleAdd }
                          },
                          [
                            _vm._v(
                              "添加" +
                                _vm._s(_vm.page_name) +
                                "\n                    "
                            )
                          ]
                        )
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _c("el-cascader", {
                    attrs: {
                      options: _vm.options,
                      clearable: "",
                      placeholder: "过滤文章类型"
                    },
                    on: { change: _vm.handleChange },
                    model: {
                      value: _vm.selectedOptions,
                      callback: function($$v) {
                        _vm.selectedOptions = $$v
                      },
                      expression: "selectedOptions"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "el-button",
                    {
                      attrs: {
                        type: "warning",
                        size: "small",
                        icon: "el-icon-setting"
                      },
                      on: { click: _vm.cleanCache }
                    },
                    [
                      _vm._v(
                        "\n                    清除" +
                          _vm._s(_vm.page_name) +
                          "缓存\n                "
                      )
                    ]
                  )
                ],
                2
              ),
              _vm._v(" "),
              _c(
                "el-col",
                { attrs: { span: 10 } },
                [
                  _c(
                    "el-input",
                    {
                      staticClass: "input-with-select",
                      attrs: {
                        placeholder: "请输入要搜索的内容...",
                        size: "small"
                      },
                      model: {
                        value: _vm.search.value,
                        callback: function($$v) {
                          _vm.$set(_vm.search, "value", $$v)
                        },
                        expression: "search.value"
                      }
                    },
                    [
                      _c(
                        "el-select",
                        {
                          staticStyle: { width: "110px" },
                          attrs: {
                            slot: "prepend",
                            size: "small",
                            placeholder: "请选择"
                          },
                          slot: "prepend",
                          model: {
                            value: _vm.search.field,
                            callback: function($$v) {
                              _vm.$set(_vm.search, "field", $$v)
                            },
                            expression: "search.field"
                          }
                        },
                        _vm._l(_vm.columns, function(item) {
                          return item.search
                            ? _c("el-option", {
                                key: item.prop,
                                attrs: { label: item.label, value: item.prop }
                              })
                            : _vm._e()
                        })
                      ),
                      _vm._v(" "),
                      _c("el-button", {
                        attrs: {
                          slot: "append",
                          size: "small",
                          icon: "el-icon-search"
                        },
                        on: { click: _vm.handleSearch },
                        slot: "append"
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("Table", {
        ref: "table",
        attrs: { url: _vm.url, columns: _vm.columns, checkbox: false },
        on: { tools: _vm.handleTools }
      }),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "编辑" + _vm.page_name,
            visible: _vm.editFormVisible
          },
          on: {
            "update:visible": function($event) {
              _vm.editFormVisible = $event
            }
          }
        },
        [
          _vm.editFormVisible
            ? _c("Edit", {
                ref: "editForm",
                attrs: { id: _vm.edit_id },
                on: {
                  render: this.handleRenderTable,
                  close: function($event) {
                    _vm.editFormVisible = false
                  }
                }
              })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1ebe79b6", module.exports)
  }
}

/***/ })

});