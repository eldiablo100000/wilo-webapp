module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2540":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, onUpdate) {
  var x = _ref.x,
      y = _ref.y,
      startX = _ref.startX,
      startY = _ref.startY;
  return function (dragEvent) {

    x += dragEvent.pageX - startX;
    y += dragEvent.pageY - startY;

    onUpdate({ x: x, y: y });

    startX = dragEvent.pageX;
    startY = dragEvent.pageY;
  };
};

/***/ }),

/***/ "255b":
/***/ (function(module, exports, __webpack_require__) {

!function(r,n){ true?module.exports=n():undefined}(window,function(){return function(r){var n={};function t(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return r[e].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=r,t.c=n,t.d=function(r,n,e){t.o(r,n)||Object.defineProperty(r,n,{enumerable:!0,get:e})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,n){if(1&n&&(r=t(r)),8&n)return r;if(4&n&&"object"==typeof r&&r&&r.__esModule)return r;var e=Object.create(null);if(t.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:r}),2&n&&"string"!=typeof r)for(var o in r)t.d(e,o,function(n){return r[n]}.bind(null,o));return e},t.n=function(r){var n=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(n,"a",n),n},t.o=function(r,n){return Object.prototype.hasOwnProperty.call(r,n)},t.p="",t(t.s=0)}([function(r,n,t){"use strict";function e(r,n){return Array.isArray(n)?[r.a*n[0]+r.c*n[1]+r.e,r.b*n[0]+r.d*n[1]+r.f]:{x:r.a*n.x+r.c*n.y+r.e,y:r.b*n.x+r.d*n.y+r.f}}function o(r,n){return n.map(function(n){return e(r,n)})}function u(r){return{a:parseFloat(r.a),b:parseFloat(r.b),c:parseFloat(r.c),d:parseFloat(r.d),e:parseFloat(r.e),f:parseFloat(r.f)}}t.r(n);var a=/^matrix\(\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*,\s*([0-9_+-.e]+)\s*\)$/i;function i(r){var n=r.match(a);if(null===n||n.length<7)throw new Error("'"+r+"' is not a matrix");return{a:parseFloat(n[1]),b:parseFloat(n[2]),c:parseFloat(n[3]),d:parseFloat(n[4]),e:parseFloat(n[5]),f:parseFloat(n[6])}}function f(){return{a:1,c:0,e:0,b:0,d:1,f:0}}function c(r){var n=r.a,t=r.b,e=r.c,o=r.d,u=r.e,a=r.f,i=n*o-t*e;return{a:o/i,b:t/-i,c:e/-i,d:n/i,e:(o*u-e*a)/-i,f:(t*u-n*a)/i}}var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},s=function(r){return"number"==typeof r&&!isNaN(r)&&isFinite(r)},l=function(r){return null!=r&&"object"===(void 0===r?"undefined":d(r))};function p(r){return l(r)&&r.hasOwnProperty("a")&&s(r.a)&&r.hasOwnProperty("b")&&s(r.b)&&r.hasOwnProperty("c")&&s(r.c)&&r.hasOwnProperty("d")&&s(r.d)&&r.hasOwnProperty("e")&&s(r.e)&&r.hasOwnProperty("f")&&s(r.f)}function y(r){return void 0===r}function b(r){return{a:1,c:0,e:r,b:0,d:1,f:arguments.length>1&&void 0!==arguments[1]?arguments[1]:0}}function v(){for(var r=arguments.length,n=Array(r),t=0;t<r;t++)n[t]=arguments[t];var e=function(r,n){return{a:r.a*n.a+r.c*n.b,c:r.a*n.c+r.c*n.d,e:r.a*n.e+r.c*n.f+r.e,b:r.b*n.a+r.d*n.b,d:r.b*n.c+r.d*n.d,f:r.b*n.e+r.d*n.f+r.f}};switch((n=Array.isArray(n[0])?n[0]:n).length){case 0:throw new Error("no matrices provided");case 1:return n[0];case 2:return e(n[0],n[1]);default:var o=function(r){return Array.isArray(r)?r:Array.from(r)}(n),u=o[0],a=o[1],i=o.slice(2),f=e(u,a);return v.apply(void 0,[f].concat(function(r){if(Array.isArray(r)){for(var n=0,t=Array(r.length);n<r.length;n++)t[n]=r[n];return t}return Array.from(r)}(i)))}}function m(){return v.apply(void 0,arguments)}var h=Math.cos,x=Math.sin,g=Math.PI;function w(r,n,t){var e=h(r),o=x(r),u={a:e,c:-o,e:0,b:o,d:e,f:0};return y(n)||y(t)?u:v([b(n,t),u,b(-n,-t)])}function P(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;return w(r*g/180,n,t)}function S(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;return y(n)&&(n=r),{a:r,c:0,e:0,b:0,d:n,f:0}}function O(r,n){return{a:1,c:r,e:0,b:n,d:1,f:0}}var A=Math.tan;function F(r,n){return{a:1,c:A(r),e:0,b:A(n),d:1,f:0}}function M(r,n){return F(r*Math.PI/180,n*Math.PI/180)}function j(r){return T(r)}function _(r){return T(r)}function T(r){return"matrix("+r.a+","+r.b+","+r.c+","+r.d+","+r.e+","+r.f+")"}t.d(n,"applyToPoint",function(){return e}),t.d(n,"applyToPoints",function(){return o}),t.d(n,"fromObject",function(){return u}),t.d(n,"fromString",function(){return i}),t.d(n,"identity",function(){return f}),t.d(n,"inverse",function(){return c}),t.d(n,"isAffineMatrix",function(){return p}),t.d(n,"rotate",function(){return w}),t.d(n,"rotateDEG",function(){return P}),t.d(n,"scale",function(){return S}),t.d(n,"shear",function(){return O}),t.d(n,"skew",function(){return F}),t.d(n,"skewDEG",function(){return M}),t.d(n,"toCSS",function(){return j}),t.d(n,"toSVG",function(){return _}),t.d(n,"toString",function(){return T}),t.d(n,"transform",function(){return v}),t.d(n,"compose",function(){return m}),t.d(n,"translate",function(){return b})}])});
//# sourceMappingURL=transformation-matrix.min.js.map

/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "8675":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pointFinder = __webpack_require__("959e");

/**
 * Perform Scaling based on a positioned handle
 *
 * @param {string} scaleType scale point position name
 * @param {Object} payload an object holding element information
 * @param {number} payload.startX mouse down position on X axis
 * @param {number} payload.startY mouse down position on Y axis
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.scaleX amount of scale for x (width)
 * @param {number} payload.scaleY amount of scale for y (height)
 * @param {number} payload.width original width
 * @param {number} payload.height original height
 * @param {number} payload.angle the angle of rotation
 * @param {number} payload.scaleLimit minimum scale limit
 * @param {boolean} payload.scaleFromCenter is scale from center
 * @param {boolean} payload.aspectRatio is scale on aspect ration
 * @param {Function} onUpdate a callback on mouse up
 *
 * @returns {Function} a function for mouse move
 */
exports.default = function (scaleType, _ref, onUpdate) {
  var startX = _ref.startX,
      startY = _ref.startY,
      x = _ref.x,
      y = _ref.y,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      width = _ref.width,
      height = _ref.height,
      angle = _ref.angle,
      scaleLimit = _ref.scaleLimit,
      _ref$scaleFromCenter = _ref.scaleFromCenter,
      scaleFromCenter = _ref$scaleFromCenter === undefined ? false : _ref$scaleFromCenter,
      _ref$enableScaleFromC = _ref.enableScaleFromCenter,
      enableScaleFromCenter = _ref$enableScaleFromC === undefined ? true : _ref$enableScaleFromC,
      _ref$aspectRatio = _ref.aspectRatio,
      aspectRatio = _ref$aspectRatio === undefined ? false : _ref$aspectRatio,
      _ref$enableAspectRati = _ref.enableAspectRatio,
      enableAspectRatio = _ref$enableAspectRati === undefined ? true : _ref$enableAspectRati;


  var ratio = width * scaleX / (height * scaleY);

  var point = (0, _pointFinder.getPoint)(scaleType, { x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height, angle: angle, scaleFromCenter: scaleFromCenter });

  var oppositePoint = (0, _pointFinder.getOppositePoint)(scaleType, {
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY,
    width: width,
    height: height,
    angle: angle
  });

  var currentProps = {
    x: x,
    y: y,
    scaleX: scaleX,
    scaleY: scaleY
  };

  return function (event) {

    if (enableScaleFromCenter && (event.altKey && !scaleFromCenter || !event.altKey && scaleFromCenter)) {

      startX = event.pageX;
      startY = event.pageY;

      scaleFromCenter = event.altKey && !scaleFromCenter;

      point = (0, _pointFinder.getPoint)(scaleType, _extends({}, currentProps, {
        width: width,
        height: height,
        angle: angle,
        scaleFromCenter: scaleFromCenter
      }));

      oppositePoint = (0, _pointFinder.getOppositePoint)(scaleType, _extends({}, currentProps, {
        width: width,
        height: height,
        angle: angle
      }));
    }

    if (!event.shiftKey && aspectRatio) {
      aspectRatio = false;
    } else if (event.shiftKey && !aspectRatio) {
      aspectRatio = true;
    }

    if (!enableAspectRatio) {
      aspectRatio = false;
    }
    aspectRatio = true /*natale*/
    enableAspectRatio = true /*natale*/
    var moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    };

    var movePoint = (0, _pointFinder.getMovePoint)(scaleType, oppositePoint, point, moveDiff);

    if (enableScaleFromCenter && scaleFromCenter) {
      movePoint.x *= 2;
      movePoint.y *= 2;
    }

    var _getSineCosine = (0, _pointFinder.getSineCosine)(scaleType, angle),
        sin = _getSineCosine.sin,
        cos = _getSineCosine.cos;

    var rotationPoint = {
      x: movePoint.x * cos + movePoint.y * sin,
      y: movePoint.y * cos - movePoint.x * sin
    };

    currentProps.scaleX = rotationPoint.x / width > scaleLimit ? rotationPoint.x / width : scaleLimit;
    currentProps.scaleY = rotationPoint.y / height > scaleLimit ? rotationPoint.y / height : scaleLimit;

    switch (scaleType) {
      case 'ml':
      case 'mr':
        currentProps.scaleY = scaleY;
        if (aspectRatio) {
          currentProps.scaleY = width * currentProps.scaleX * (1 / ratio) / height;
        }
        break;
      case 'tm':
      case 'bm':
        currentProps.scaleX = scaleX;
        if (aspectRatio) {
          currentProps.scaleX = height * currentProps.scaleY * ratio / width;
        }
        break;
      default:
        if (aspectRatio) {
          currentProps.scaleY = width * currentProps.scaleX * (1 / ratio) / height;
        }
    }

    if (enableScaleFromCenter && scaleFromCenter) {
      var center = (0, _pointFinder.getCenter)({
        x: x,
        y: y,
        width: width,
        height: height,
        scaleX: currentProps.scaleX,
        scaleY: currentProps.scaleY
      });
      currentProps.x = x + (point.x - center.x);
      currentProps.y = y + (point.y - center.y);
    } else {
      var freshOppositePoint = (0, _pointFinder.getOppositePoint)(scaleType, {
        width: width,
        height: height,
        angle: angle,
        x: x,
        y: y,
        scaleX: currentProps.scaleX,
        scaleY: currentProps.scaleY
      });

      currentProps.x = x + (oppositePoint.x - freshOppositePoint.x);
      currentProps.y = y + (oppositePoint.y - freshOppositePoint.y);
    }

    onUpdate(currentProps);
  };
};

/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "89e1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transformationMatrix = __webpack_require__("255b");

//https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
var roundTo = function roundTo(n) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = Math.round(n) / multiplicator;
  return +test.toFixed(2);
};

exports.default = function (_ref) {
  var x = _ref.x,
      y = _ref.y,
      angle = _ref.angle,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      width = _ref.width,
      height = _ref.height,
      _ref$disableScale = _ref.disableScale,
      disableScale = _ref$disableScale === undefined ? false : _ref$disableScale;


  var changedWidth = width * (1 - scaleX);
  var newWidth = width - changedWidth;
  var changedHeight = height * (1 - scaleY);
  var newHeight = height - changedHeight;

  var transformMatrix = void 0;

  if (disableScale === false) {
    transformMatrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(roundTo(x + changedWidth / 2), roundTo(y + changedHeight / 2)), (0, _transformationMatrix.rotate)(angle * (Math.PI / 180)), (0, _transformationMatrix.scale)(scaleX, scaleY));
  } else {
    transformMatrix = (0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(roundTo(x + changedWidth), roundTo(y + changedHeight)), (0, _transformationMatrix.rotate)(angle * (Math.PI / 180)));
    width = newWidth;
    height = newHeight;
  }

  return {
    element: {
      width: width,
      height: height,
      transform: (0, _transformationMatrix.toCSS)(transformMatrix),
      position: "absolute"
    },
    controls: {
      width: newWidth,
      height: newHeight,
      transform: (0, _transformationMatrix.toCSS)((0, _transformationMatrix.transform)((0, _transformationMatrix.translate)(roundTo(x + changedWidth), roundTo(y + changedHeight)), (0, _transformationMatrix.rotate)(angle * (Math.PI / 180)))),
      position: "absolute"
    }
  };
};

/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "927f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pointFinder = __webpack_require__("959e");

exports.default = function (_ref, onUpdate) {
  var x = _ref.x,
      y = _ref.y,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      width = _ref.width,
      height = _ref.height,
      angle = _ref.angle,
      startX = _ref.startX,
      startY = _ref.startY,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY;


  var center = (0, _pointFinder.getCenter)({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height });

  var pressAngle = Math.atan2(startY - offsetY - center.y, startX - offsetX - center.x) * 180 / Math.PI;

  return function (event) {

    var degree = Math.atan2(event.pageY - offsetY - center.y, event.pageX - offsetX - center.x) * 180 / Math.PI;

    var ang = angle + degree - pressAngle;

    if (event.shiftKey) {
      ang = (ang / 15 >> 0) * 15;
    }

    onUpdate({
      angle: ang
    });
  };
};

/***/ }),

/***/ "959e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Find the actual point position of a transformed point
 *
 * @param {Object} payload an object holding required information to find actual point
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center  {{x,y}} the center of element
 * @param {number} payload.rad the a computed radians of a provided angle
 *
 * @returns {{x: number, y: number}} an object holding the position
 */
var findPoint = function findPoint(_ref) {
  var x = _ref.x,
      y = _ref.y,
      angle = _ref.angle,
      center = _ref.center,
      _ref$rad = _ref.rad,
      rad = _ref$rad === undefined ? angle * (Math.PI / 180) : _ref$rad;
  return {
    x: (x - center.x) * Math.cos(rad) - (y - center.y) * Math.sin(rad) + center.x,
    y: (x - center.x) * Math.sin(rad) + (y - center.y) * Math.cos(rad) + center.y
  };
};

/**
 * Get the Center point of a box
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 *
 * @returns {{x: *, y: *}} the center of point of element
 */
var getCenter = exports.getCenter = function getCenter(_ref2) {
  var x = _ref2.x,
      y = _ref2.y,
      scaleX = _ref2.scaleX,
      scaleY = _ref2.scaleY,
      width = _ref2.width,
      height = _ref2.height;

  var changedWidth = width * scaleX;
  var changedHeight = height * scaleY;

  var changedWidthDiff = changedWidth - width;
  var changedHeightDiff = changedHeight - height;

  return {
    x: x - changedWidthDiff + changedWidth / 2,
    y: y - changedHeightDiff + changedHeight / 2
  };
};

/**
 * get the TopLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getTL = exports.getTL = function getTL(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      scaleX = _ref3.scaleX,
      scaleY = _ref3.scaleY,
      width = _ref3.width,
      height = _ref3.height,
      angle = _ref3.angle,
      _ref3$center = _ref3.center,
      center = _ref3$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref3$center;
  return findPoint({
    x: x,
    y: y,
    angle: angle,
    center: center
  });
};

/**
 * get the LeftBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getBL = exports.getBL = function getBL(_ref4) {
  var x = _ref4.x,
      y = _ref4.y,
      scaleX = _ref4.scaleX,
      scaleY = _ref4.scaleY,
      width = _ref4.width,
      height = _ref4.height,
      angle = _ref4.angle,
      _ref4$center = _ref4.center,
      center = _ref4$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref4$center;


  return findPoint({
    angle: angle,
    center: center,
    x: x,
    y: y + height * scaleY
  });
};

/**
 * Get TopRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getTR = exports.getTR = function getTR(_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      scaleX = _ref5.scaleX,
      scaleY = _ref5.scaleY,
      width = _ref5.width,
      height = _ref5.height,
      angle = _ref5.angle,
      _ref5$center = _ref5.center,
      center = _ref5$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref5$center;
  return findPoint({
    angle: angle,
    center: center,
    x: x + width * scaleX,
    y: y
  });
};

/**
 * Get BottomRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getBR = exports.getBR = function getBR(_ref6) {
  var x = _ref6.x,
      y = _ref6.y,
      scaleX = _ref6.scaleX,
      scaleY = _ref6.scaleY,
      width = _ref6.width,
      height = _ref6.height,
      angle = _ref6.angle,
      _ref6$center = _ref6.center,
      center = _ref6$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref6$center;

  return findPoint({
    angle: angle,
    center: center,
    x: x + width * scaleX,
    y: y + height * scaleY
  });
};

/**
 * get MiddleRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getMR = exports.getMR = function getMR(_ref7) {
  var x = _ref7.x,
      y = _ref7.y,
      scaleX = _ref7.scaleX,
      scaleY = _ref7.scaleY,
      width = _ref7.width,
      height = _ref7.height,
      angle = _ref7.angle,
      _ref7$center = _ref7.center,
      center = _ref7$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref7$center;
  return findPoint({
    x: x + width * scaleX,
    y: y + height * scaleY / 2,
    center: center,
    angle: angle
  });
};

/**
 * get MiddleBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getBM = exports.getBM = function getBM(_ref8) {
  var x = _ref8.x,
      y = _ref8.y,
      scaleX = _ref8.scaleX,
      scaleY = _ref8.scaleY,
      width = _ref8.width,
      height = _ref8.height,
      angle = _ref8.angle,
      _ref8$center = _ref8.center,
      center = _ref8$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref8$center;
  return findPoint({
    x: x + width * scaleX / 2,
    y: y + height * scaleY,
    center: center,
    angle: angle
  });
};

/**
 * get MiddleTop point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getTM = exports.getTM = function getTM(_ref9) {
  var x = _ref9.x,
      y = _ref9.y,
      scaleX = _ref9.scaleX,
      scaleY = _ref9.scaleY,
      width = _ref9.width,
      height = _ref9.height,
      angle = _ref9.angle,
      _ref9$center = _ref9.center,
      center = _ref9$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref9$center;
  return findPoint({
    x: x + width * scaleX / 2,
    y: y,
    center: center,
    angle: angle
  });
};

/**
 * get MiddleLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.scaleX the scaleX of element
 * @param {number} payload.scaleY the scaleY of element
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
var getML = exports.getML = function getML(_ref10) {
  var x = _ref10.x,
      y = _ref10.y,
      scaleX = _ref10.scaleX,
      scaleY = _ref10.scaleY,
      width = _ref10.width,
      height = _ref10.height,
      angle = _ref10.angle,
      _ref10$center = _ref10.center,
      center = _ref10$center === undefined ? getCenter({ x: x, y: y, scaleX: scaleX, scaleY: scaleY, width: width, height: height }) : _ref10$center;
  return findPoint({
    x: x,
    y: y + height * scaleY / 2,
    center: center,
    angle: angle
  });
};

/**
 * given a point, get it's opposite point
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.scaleX the scaleX of element
 * @param {number} props.scaleY the scaleY of element
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
var getOppositePoint = exports.getOppositePoint = function getOppositePoint(scaleType, props) {

  var caller = void 0;

  var center = getCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    scaleX: props.scaleX,
    scaleY: props.scaleY
  });

  props = _extends({
    center: center
  }, props, {
    x: getOriginalPositionFromScale(props.x, props.width, props.scaleX),
    y: getOriginalPositionFromScale(props.y, props.height, props.scaleY)
  });

  switch (scaleType) {
    case 'tl':
      caller = getBR;
      break;

    case 'ml':
      caller = getMR;
      break;

    case 'tr':
      caller = getBL;
      break;

    case 'tm':
      caller = getBM;
      break;

    case 'bl':
      caller = getTR;
      break;

    case 'bm':
      caller = getTM;
      break;

    case 'br':
      caller = getTL;
      break;

    case 'mr':
      caller = getML;
      break;
  }
  return caller(props);
};

/**
 * given a point position by it's string name
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.scaleX the scaleX of element
 * @param {number} props.scaleY the scaleY of element
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {boolean} props.scaleFromCenter scaling performed from center
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
var getPoint = exports.getPoint = function getPoint(scaleType, props) {

  var center = getCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    scaleX: props.scaleX,
    scaleY: props.scaleY
  });

  if (props.scaleFromCenter) {
    return center;
  }

  props = _extends({
    center: center
  }, props, {
    x: getOriginalPositionFromScale(props.x, props.width, props.scaleX),
    y: getOriginalPositionFromScale(props.y, props.height, props.scaleY)
  });

  var caller = void 0;
  switch (scaleType) {

    case 'tl':
      caller = getTL;
      break;

    case 'ml':
      caller = getML;
      break;

    case 'tr':
      caller = getTR;
      break;

    case 'tm':
      caller = getTM;
      break;

    case 'bl':
      caller = getBL;
      break;

    case 'bm':
      caller = getBM;
      break;

    case 'br':
      caller = getBR;
      break;

    case 'mr':
      caller = getMR;
      break;
  }

  return caller(props);
};

/**
 * get sine and cosine for a point based on angle and point name
 *
 * @param {string} scaleType scale point position name
 * @param {number} angle the  rotation angle
 *
 * @returns {{sin: number, cos: number}} the sine and cosine of scale type
 */
var getSineCosine = exports.getSineCosine = function getSineCosine(scaleType, angle) {
  switch (scaleType) {
    case 'tr':
    case 'tm':
    case 'bl':
    case 'bm':
      return {
        cos: Math.cos(-angle * (Math.PI / 180)),
        sin: Math.sin(-angle * (Math.PI / 180))
      };
    default:
      return {
        sin: Math.sin(angle * (Math.PI / 180)),
        cos: Math.cos(angle * (Math.PI / 180))
      };
  }
};

/**
 * get the amount of movement for a point
 *
 * @param {string} scaleType scale point position name
 * @param {object} oppositePoint the opposite point position {x: number,y: number}
 * @param {object} point the point position {x: number,y: number}
 * @param {object} moveDiff the the amount of pixels that element moved {x: number,y: number}
 *
 * @returns {{x: number, y:number}} the new position of moved element
 */
var getMovePoint = exports.getMovePoint = function getMovePoint(scaleType, oppositePoint, point, moveDiff) {
  switch (scaleType) {

    case 'tl':
      return {
        x: oppositePoint.x - (moveDiff.x + point.x),
        y: oppositePoint.y - (moveDiff.y + point.y)
      };
    case 'ml':
      return {
        x: oppositePoint.x - moveDiff.x - point.x,
        y: oppositePoint.y - moveDiff.y - point.y
      };

    case 'tr':
    case 'tm':
      return {
        x: point.x + (moveDiff.x - oppositePoint.x),
        y: oppositePoint.y - (moveDiff.y + point.y)
      };
    case 'mr':
    case 'br':
      return {
        x: point.x + (moveDiff.x - oppositePoint.x),
        y: point.y + (moveDiff.y - oppositePoint.y)
      };
    case 'bl':
    case 'bm':
      return {
        x: oppositePoint.x - (moveDiff.x + point.x),
        y: point.y + (moveDiff.y - oppositePoint.y)
      };
  }
};

/**
 * guess the original point position based on scale and the position after scaling
 *
 * @param {number} position the position of x or y
 * @param {number} size the size of element (width for x, height for y)
 * @param {number} scale the amount of scaled element (scaleX for x, scaleY for y)
 *
 * @returns {number} the original point position
 */
var getOriginalPositionFromScale = function getOriginalPositionFromScale(position, size, scale) {
  var changed = size * scale;

  var diff = changed - size;

  return position - diff;
};

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9cdd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styler = exports.translate = exports.rotate = exports.scale = undefined;

var _scale = __webpack_require__("8675");

var _scale2 = _interopRequireDefault(_scale);

var _rotate = __webpack_require__("927f");

var _rotate2 = _interopRequireDefault(_rotate);

var _translate = __webpack_require__("2540");

var _translate2 = _interopRequireDefault(_translate);

var _styler = __webpack_require__("89e1");

var _styler2 = _interopRequireDefault(_styler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.scale = _scale2.default;
exports.rotate = _rotate2.default;
exports.translate = _translate2.default;
exports.styler = _styler2.default;

/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2867f158-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FreeTransform.vue?vue&type=template&id=7f510dfe&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:( _obj = {}, _obj[(_vm.classPrefix + "-transform")] = true, _obj[(_vm.classPrefix + "-transform--active")] = _vm.selected, _obj ),style:(_vm.styles),on:{"click":_vm.click,"dblclick":_vm.dblClick,"mousedown":_vm.mousedown}},[_c('div',{class:(_vm.classPrefix + "-transform__content"),style:(_vm.computedStyles.element)},[_vm._t("default")],2),(_vm.selected)?_c('div',{class:(_vm.classPrefix + "-transform__controls"),style:(_vm.computedStyles.controls)},[_c('div',{class:(_vm.classPrefix + "-transform__rotator"),on:{"mousedown":_vm.handleRotation}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--tl")],on:{"mousedown":function($event){_vm.handleScale('tl',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--ml")],on:{"mousedown":function($event){_vm.handleScale('ml',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--tr")],on:{"mousedown":function($event){_vm.handleScale('tr',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--tm")],on:{"mousedown":function($event){_vm.handleScale('tm',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--bl")],on:{"mousedown":function($event){_vm.handleScale('bl',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--bm")],on:{"mousedown":function($event){_vm.handleScale('bm',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--br")],on:{"mousedown":function($event){_vm.handleScale('br',$event)}}}),_c('div',{class:[(_vm.classPrefix + "-transform__scale-point " + _vm.classPrefix + "-transform__scale-point--mr")],on:{"mousedown":function($event){_vm.handleScale('mr',$event)}}})]):_vm._e()])
var _obj;}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FreeTransform.vue?vue&type=template&id=7f510dfe&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
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
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/free-transform/lib/index.js
var lib = __webpack_require__("9cdd");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FreeTransform.vue?vue&type=script&lang=js&


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

/* harmony default export */ var FreeTransformvue_type_script_lang_js_ = ({
  name: 'Transform',
  props: {
    classPrefix: {
      type: String,
      default: "tr"
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    scaleX: {
      type: Number,
      required: true
    },
    scaleY: {
      type: Number,
      required: true
    },
    scaleLimit: {
      type: Number,
      default: 0.1
    },
    angle: {
      type: Number,
      required: true
    },
    disableScale: {
      type: Boolean,
      default: false
    },
    offsetX: {
      type: Number,
      required: true
    },
    offsetY: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    selectOn: {
      validator: function validator(value) {
        return ['dblclick', 'mousedown', 'click'].indexOf(value) !== -1;
      },
      default: 'mousedown'
    },
    aspectRatio: {
      type: Boolean,
      default: true
    },
    scaleFromCenter: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedStyles: function computedStyles() {
      var _styler = Object(lib["styler"])({
        x: this.x,
        y: this.y,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        width: this.width,
        height: this.height,
        angle: this.angle,
        disableScale: this.disableScale
      }),
          element = _styler.element,
          controls = _styler.controls;

      return {
        element: _objectSpread({}, element, {
          width: element.width ? "".concat(element.width, "px") : null,
          height: element.height ? "".concat(element.height, "px") : null
        }),
        controls: _objectSpread({}, controls, {
          width: "".concat(controls.width, "px"),
          height: "".concat(controls.height, "px")
        })
      };
    }
  },
  methods: {
    handleScale: function handleScale(scaleType, event) {
      var _this = this;

      event.stopPropagation();
      event.preventDefault();
      var drag = Object(lib["scale"])(scaleType, {
        startX: event.pageX,
        startY: event.pageY,
        x: this.x,
        y: this.y,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        width: this.width,
        height: this.height,
        angle: this.angle,
        scaleLimit: this.scaleLimit,
        scaleFromCenter: this.scaleFromCenter && event.altKey,
        enableScaleFromCenter: this.scaleFromCenter,
        aspectRatio: this.aspectRatio, /*natale*/
        enableAspectRatio: this.aspectRatio
      }, function (payload) {
        _this.$emit("update", payload);
      });
      this.onDrag(drag);
    },
    handleTranslation: function handleTranslation(event) {
      var _this2 = this;

      event.stopPropagation();
      var drag = Object(lib["translate"])({
        x: this.x,
        y: this.y,
        startX: event.pageX,
        startY: event.pageY
      }, function (payload) {
        _this2.$emit("update", payload);
      });
      this.onDrag(drag);
    },
    handleRotation: function handleRotation(event) {
      var _this3 = this;

      event.stopPropagation();
      var drag = Object(lib["rotate"])({
        startX: event.pageX,
        startY: event.pageY,
        x: this.x,
        y: this.y,
        scaleX: this.scaleX,
        scaleY: this.scaleY,
        width: this.width,
        height: this.height,
        angle: this.angle,
        offsetX: this.offsetX,
        offsetY: this.offsetY
      }, function (payload) {
        _this3.$emit("update", payload);
      });
      this.onDrag(drag);
    },
    onDrag: function onDrag(drag) {
      var up = function up() {
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', up);
    },
    mousedown: function mousedown(event) {
      this.$emit("mousedown", event);

      if (this.selectOn === 'mousedown' || this.selected === true) {
        this.$emit('onSelect');
        this.handleTranslation(event);
      }
    },
    click: function click(event) {
      this.$emit('click', event);

      if (this.selectOn === 'click') {
        this.$emit('onSelect');
      }
    },
    dblClick: function dblClick(event) {
      this.$emit('dblclick', event);

      if (this.selectOn === 'dblclick') {
        this.$emit('onSelect');
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/FreeTransform.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FreeTransformvue_type_script_lang_js_ = (FreeTransformvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
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
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/FreeTransform.vue





/* normalize component */

var component = normalizeComponent(
  components_FreeTransformvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "FreeTransform.vue"
/* harmony default export */ var FreeTransform = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (FreeTransform);



/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ })["default"];
//# sourceMappingURL=FreeTransform.common.js.map
