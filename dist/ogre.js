!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ogre=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are all falsey.
 *
 * @static
 * @memberOf _
 * @category Arrays
 * @param {Array} array The array to compact.
 * @returns {Array} Returns a new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array ? array.length : 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result.push(value);
    }
  }
  return result;
}

module.exports = compact;

},{}],2:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = _dereq_('../internals/createWrapper'),
    slice = _dereq_('../internals/slice'),
    support = _dereq_('../support');

/**
 * Creates a function that, when called, invokes `func` with the `this`
 * binding of `thisArg` and prepends any additional `bind` arguments to those
 * provided to the bound function.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [arg] Arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  return arguments.length > 2
    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
    : createWrapper(func, 1, null, null, thisArg);
}

module.exports = bind;

},{"../internals/createWrapper":12,"../internals/slice":27,"../support":40}],3:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to pool arrays and objects used internally */
var arrayPool = [];

module.exports = arrayPool;

},{}],4:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = _dereq_('./baseCreate'),
    isObject = _dereq_('../objects/isObject'),
    setBindData = _dereq_('./setBindData'),
    slice = _dereq_('./slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `_.bind` that creates the bound function and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new bound function.
 */
function baseBind(bindData) {
  var func = bindData[0],
      partialArgs = bindData[2],
      thisArg = bindData[4];

  function bound() {
    // `Function#bind` spec
    // http://es5.github.io/#x15.3.4.5
    if (partialArgs) {
      // avoid `arguments` object deoptimizations by using `slice` instead
      // of `Array.prototype.slice.call` and not assigning `arguments` to a
      // variable as a ternary expression
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    if (this instanceof bound) {
      // ensure `new bound` is an instance of `func`
      var thisBinding = baseCreate(func.prototype),
          result = func.apply(thisBinding, args || arguments);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisArg, args || arguments);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseBind;

},{"../objects/isObject":36,"./baseCreate":6,"./setBindData":24,"./slice":27}],5:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var assign = _dereq_('../objects/assign'),
    baseEach = _dereq_('./baseEach'),
    forOwn = _dereq_('../objects/forOwn'),
    getArray = _dereq_('./getArray'),
    isArray = _dereq_('../objects/isArray'),
    isNode = _dereq_('./isNode'),
    isObject = _dereq_('../objects/isObject'),
    releaseArray = _dereq_('./releaseArray'),
    slice = _dereq_('./slice'),
    support = _dereq_('../support');

/** Used to match regexp flags from their coerced string values */
var reFlags = /\w*$/;

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

/** Used to identify object classifications that `_.clone` supports */
var cloneableClasses = {};
cloneableClasses[funcClass] = false;
cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
cloneableClasses[boolClass] = cloneableClasses[dateClass] =
cloneableClasses[numberClass] = cloneableClasses[objectClass] =
cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to lookup a built-in constructor by [[Class]] */
var ctorByClass = {};
ctorByClass[arrayClass] = Array;
ctorByClass[boolClass] = Boolean;
ctorByClass[dateClass] = Date;
ctorByClass[funcClass] = Function;
ctorByClass[objectClass] = Object;
ctorByClass[numberClass] = Number;
ctorByClass[regexpClass] = RegExp;
ctorByClass[stringClass] = String;

/**
 * The base implementation of `_.clone` without argument juggling or support
 * for `thisArg` binding.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep=false] Specify a deep clone.
 * @param {Function} [callback] The function to customize cloning values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, callback, stackA, stackB) {
  if (callback) {
    var result = callback(value);
    if (typeof result != 'undefined') {
      return result;
    }
  }
  // inspect [[Class]]
  var isObj = isObject(value);
  if (isObj) {
    var className = toString.call(value);
    if (!cloneableClasses[className] || (!support.nodeClass && isNode(value))) {
      return value;
    }
    var ctor = ctorByClass[className];
    switch (className) {
      case boolClass:
      case dateClass:
        return new ctor(+value);

      case numberClass:
      case stringClass:
        return new ctor(value);

      case regexpClass:
        result = ctor(value.source, reFlags.exec(value));
        result.lastIndex = value.lastIndex;
        return result;
    }
  } else {
    return value;
  }
  var isArr = isArray(value);
  if (isDeep) {
    // check for circular references and return corresponding clone
    var initedStack = !stackA;
    stackA || (stackA = getArray());
    stackB || (stackB = getArray());

    var length = stackA.length;
    while (length--) {
      if (stackA[length] == value) {
        return stackB[length];
      }
    }
    result = isArr ? ctor(value.length) : {};
  }
  else {
    result = isArr ? slice(value) : assign({}, value);
  }
  // add array properties assigned by `RegExp#exec`
  if (isArr) {
    if (hasOwnProperty.call(value, 'index')) {
      result.index = value.index;
    }
    if (hasOwnProperty.call(value, 'input')) {
      result.input = value.input;
    }
  }
  // exit for shallow clone
  if (!isDeep) {
    return result;
  }
  // add the source value to the stack of traversed objects
  // and associate it with its clone
  stackA.push(value);
  stackB.push(result);

  // recursively populate clone (susceptible to call stack limits)
  (isArr ? baseEach : forOwn)(value, function(objValue, key) {
    result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
  });

  if (initedStack) {
    releaseArray(stackA);
    releaseArray(stackB);
  }
  return result;
}

module.exports = baseClone;

},{"../objects/assign":28,"../objects/forOwn":31,"../objects/isArray":33,"../objects/isObject":36,"../support":40,"./baseEach":9,"./getArray":16,"./isNode":19,"./releaseArray":23,"./slice":27}],6:[function(_dereq_,module,exports){
(function (global){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = _dereq_('./isNative'),
    isObject = _dereq_('../objects/isObject'),
    noop = _dereq_('../utilities/noop');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for browsers without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }());
}

module.exports = baseCreate;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../objects/isObject":36,"../utilities/noop":42,"./isNative":18}],7:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var bind = _dereq_('../functions/bind'),
    identity = _dereq_('../utilities/identity'),
    setBindData = _dereq_('./setBindData'),
    support = _dereq_('../support');

/** Used to detected named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Native method shortcuts */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.createCallback` without support for creating
 * "_.pluck" or "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 */
function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  // exit early for no `thisArg` or already bound by `Function#bind`
  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        // checks if `func` references the `this` keyword and stores the result
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }
  // exit early if there are no `this` references or `func` is bound
  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 2: return function(a, b) {
      return func.call(thisArg, a, b);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
  }
  return bind(func, thisArg);
}

module.exports = baseCreateCallback;

},{"../functions/bind":2,"../support":40,"../utilities/identity":41,"./setBindData":24}],8:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = _dereq_('./baseCreate'),
    isObject = _dereq_('../objects/isObject'),
    setBindData = _dereq_('./setBindData'),
    slice = _dereq_('./slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `createWrapper` that creates the wrapper and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new function.
 */
function baseCreateWrapper(bindData) {
  var func = bindData[0],
      bitmask = bindData[1],
      partialArgs = bindData[2],
      partialRightArgs = bindData[3],
      thisArg = bindData[4],
      arity = bindData[5];

  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      key = func;

  function bound() {
    var thisBinding = isBind ? thisArg : this;
    if (partialArgs) {
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    if (partialRightArgs || isCurry) {
      args || (args = slice(arguments));
      if (partialRightArgs) {
        push.apply(args, partialRightArgs);
      }
      if (isCurry && args.length < arity) {
        bitmask |= 16 & ~32;
        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
      }
    }
    args || (args = arguments);
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (this instanceof bound) {
      thisBinding = baseCreate(func.prototype);
      var result = func.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisBinding, args);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseCreateWrapper;

},{"../objects/isObject":36,"./baseCreate":6,"./setBindData":24,"./slice":27}],9:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createIterator = _dereq_('./createIterator'),
    eachIteratorOptions = _dereq_('./eachIteratorOptions');

/**
 * A function compiled to iterate `arguments` objects, arrays, objects, and
 * strings consistenly across environments, executing the callback for each
 * element in the collection. The callback is bound to `thisArg` and invoked
 * with three arguments; (value, index|key, collection). Callbacks may exit
 * iteration early by explicitly returning `false`.
 *
 * @private
 * @type Function
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createIterator(eachIteratorOptions);

module.exports = baseEach;

},{"./createIterator":11,"./eachIteratorOptions":14}],10:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var forIn = _dereq_('../objects/forIn'),
    getArray = _dereq_('./getArray'),
    isArguments = _dereq_('../objects/isArguments'),
    isFunction = _dereq_('../objects/isFunction'),
    isNode = _dereq_('./isNode'),
    objectTypes = _dereq_('./objectTypes'),
    releaseArray = _dereq_('./releaseArray'),
    support = _dereq_('../support');

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isEqual`, without support for `thisArg` binding,
 * that allows partial "_.where" style comparisons.
 *
 * @private
 * @param {*} a The value to compare.
 * @param {*} b The other value to compare.
 * @param {Function} [callback] The function to customize comparing values.
 * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `a` objects.
 * @param {Array} [stackB=[]] Tracks traversed `b` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
  // used to indicate that when comparing objects, `a` has at least the properties of `b`
  if (callback) {
    var result = callback(a, b);
    if (typeof result != 'undefined') {
      return !!result;
    }
  }
  // exit early for identical values
  if (a === b) {
    // treat `+0` vs. `-0` as not equal
    return a !== 0 || (1 / a == 1 / b);
  }
  var type = typeof a,
      otherType = typeof b;

  // exit early for unlike primitive values
  if (a === a &&
      !(a && objectTypes[type]) &&
      !(b && objectTypes[otherType])) {
    return false;
  }
  // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
  // http://es5.github.io/#x15.3.4.4
  if (a == null || b == null) {
    return a === b;
  }
  // compare [[Class]] names
  var className = toString.call(a),
      otherClass = toString.call(b);

  if (className == argsClass) {
    className = objectClass;
  }
  if (otherClass == argsClass) {
    otherClass = objectClass;
  }
  if (className != otherClass) {
    return false;
  }
  switch (className) {
    case boolClass:
    case dateClass:
      // coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
      return +a == +b;

    case numberClass:
      // treat `NaN` vs. `NaN` as equal
      return (a != +a)
        ? b != +b
        // but treat `+0` vs. `-0` as not equal
        : (a == 0 ? (1 / a == 1 / b) : a == +b);

    case regexpClass:
    case stringClass:
      // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
      // treat string primitives and their corresponding object instances as equal
      return a == String(b);
  }
  var isArr = className == arrayClass;
  if (!isArr) {
    // unwrap any `lodash` wrapped values
    var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
        bWrapped = hasOwnProperty.call(b, '__wrapped__');

    if (aWrapped || bWrapped) {
      return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
    }
    // exit for functions and DOM nodes
    if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
      return false;
    }
    // in older versions of Opera, `arguments` objects have `Array` constructors
    var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
        ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;

    // non `Object` object instances with different constructors are not equal
    if (ctorA != ctorB &&
          !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
          ('constructor' in a && 'constructor' in b)
        ) {
      return false;
    }
  }
  // assume cyclic structures are equal
  // the algorithm for detecting cyclic structures is adapted from ES 5.1
  // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
  var initedStack = !stackA;
  stackA || (stackA = getArray());
  stackB || (stackB = getArray());

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == a) {
      return stackB[length] == b;
    }
  }
  var size = 0;
  result = true;

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  // recursively compare objects and arrays (susceptible to call stack limits)
  if (isArr) {
    // compare lengths to determine if a deep comparison is necessary
    length = a.length;
    size = b.length;
    result = size == length;

    if (result || isWhere) {
      // deep compare the contents, ignoring non-numeric properties
      while (size--) {
        var index = length,
            value = b[size];

        if (isWhere) {
          while (index--) {
            if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
          break;
        }
      }
    }
  }
  else {
    // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
    // which, in this case, is more costly
    forIn(b, function(value, key, b) {
      if (hasOwnProperty.call(b, key)) {
        // count the number of properties.
        size++;
        // deep compare each property value.
        return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
      }
    });

    if (result && !isWhere) {
      // ensure both objects have the same number of properties
      forIn(a, function(value, key, a) {
        if (hasOwnProperty.call(a, key)) {
          // `size` will be `-1` if `a` has more properties than `b`
          return (result = --size > -1);
        }
      });
    }
  }
  stackA.pop();
  stackB.pop();

  if (initedStack) {
    releaseArray(stackA);
    releaseArray(stackB);
  }
  return result;
}

module.exports = baseIsEqual;

},{"../objects/forIn":30,"../objects/isArguments":32,"../objects/isFunction":35,"../support":40,"./getArray":16,"./isNode":19,"./objectTypes":22,"./releaseArray":23}],11:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = _dereq_('./baseCreateCallback'),
    indicatorObject = _dereq_('./indicatorObject'),
    isArguments = _dereq_('../objects/isArguments'),
    isArray = _dereq_('../objects/isArray'),
    isString = _dereq_('../objects/isString'),
    iteratorTemplate = _dereq_('./iteratorTemplate'),
    objectTypes = _dereq_('./objectTypes');

/** Used to fix the JScript [[DontEnum]] bug */
var shadowedProps = [
  'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', 'toString', 'valueOf'
];

/** `Object#toString` result shortcuts */
var arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    errorClass = '[object Error]',
    funcClass = '[object Function]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

/** Used as the data object for `iteratorTemplate` */
var iteratorData = {
  'args': '',
  'array': null,
  'bottom': '',
  'firstArg': '',
  'init': '',
  'keys': null,
  'loop': '',
  'shadowedProps': null,
  'support': null,
  'top': '',
  'useHas': false
};

/** Used for native method references */
var errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to avoid iterating non-enumerable properties in IE < 9 */
var nonEnumProps = {};
nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
nonEnumProps[objectClass] = { 'constructor': true };

(function() {
  var length = shadowedProps.length;
  while (length--) {
    var key = shadowedProps[length];
    for (var className in nonEnumProps) {
      if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {
        nonEnumProps[className][key] = false;
      }
    }
  }
}());

/**
 * Creates compiled iteration functions.
 *
 * @private
 * @param {...Object} [options] The compile options object(s).
 * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
 * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
 * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
 * @param {string} [options.args] A comma separated string of iteration function arguments.
 * @param {string} [options.top] Code to execute before the iteration branches.
 * @param {string} [options.loop] Code to execute in the object loop.
 * @param {string} [options.bottom] Code to execute after the iteration branches.
 * @returns {Function} Returns the compiled function.
 */
function createIterator() {
  // data properties
  iteratorData.shadowedProps = shadowedProps;

  // iterator options
  iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';
  iteratorData.init = 'iterable';
  iteratorData.useHas = true;

  // merge options into a template data object
  for (var object, index = 0; object = arguments[index]; index++) {
    for (var key in object) {
      iteratorData[key] = object[key];
    }
  }
  var args = iteratorData.args;
  iteratorData.firstArg = /^[^,]+/.exec(args)[0];

  // create the function factory
  var factory = Function(
      'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +
      'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +
      'objectTypes, nonEnumProps, stringClass, stringProto, toString',
    'return function(' + args + ') {\n' + iteratorTemplate(iteratorData) + '\n}'
  );

  // return the compiled function
  return factory(
    baseCreateCallback, errorClass, errorProto, hasOwnProperty,
    indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,
    objectTypes, nonEnumProps, stringClass, stringProto, toString
  );
}

module.exports = createIterator;

},{"../objects/isArguments":32,"../objects/isArray":33,"../objects/isString":38,"./baseCreateCallback":7,"./indicatorObject":17,"./iteratorTemplate":20,"./objectTypes":22}],12:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseBind = _dereq_('./baseBind'),
    baseCreateWrapper = _dereq_('./baseCreateWrapper'),
    isFunction = _dereq_('../objects/isFunction'),
    slice = _dereq_('./slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push,
    unshift = arrayRef.unshift;

/**
 * Creates a function that, when called, either curries or invokes `func`
 * with an optional `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of method flags to compose.
 *  The bitmask may be composed of the following flags:
 *  1 - `_.bind`
 *  2 - `_.bindKey`
 *  4 - `_.curry`
 *  8 - `_.curry` (bound)
 *  16 - `_.partial`
 *  32 - `_.partialRight`
 * @param {Array} [partialArgs] An array of arguments to prepend to those
 *  provided to the new function.
 * @param {Array} [partialRightArgs] An array of arguments to append to those
 *  provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    // clone `bindData`
    bindData = slice(bindData);
    if (bindData[2]) {
      bindData[2] = slice(bindData[2]);
    }
    if (bindData[3]) {
      bindData[3] = slice(bindData[3]);
    }
    // set `thisBinding` is not previously bound
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    // set if previously bound but not currently (subsequent curried functions)
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    // set curried arity if not yet set
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    // append partial left arguments
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    // append partial right arguments
    if (isPartialRight) {
      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    // merge flags
    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }
  // fast path for `_.bind`
  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

module.exports = createWrapper;

},{"../objects/isFunction":35,"./baseBind":4,"./baseCreateWrapper":8,"./slice":27}],13:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = _dereq_('../objects/keys');

/** Reusable iterator options for `assign` and `defaults` */
var defaultsIteratorOptions = {
  'args': 'object, source, guard',
  'top':
    'var args = arguments,\n' +
    '    argsIndex = 0,\n' +
    "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
    'while (++argsIndex < argsLength) {\n' +
    '  iterable = args[argsIndex];\n' +
    '  if (iterable && objectTypes[typeof iterable]) {',
  'keys': keys,
  'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
  'bottom': '  }\n}'
};

module.exports = defaultsIteratorOptions;

},{"../objects/keys":39}],14:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var keys = _dereq_('../objects/keys');

/** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
var eachIteratorOptions = {
  'args': 'collection, callback, thisArg',
  'top': "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
  'array': "typeof length == 'number'",
  'keys': keys,
  'loop': 'if (callback(iterable[index], index, collection) === false) return result'
};

module.exports = eachIteratorOptions;

},{"../objects/keys":39}],15:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var eachIteratorOptions = _dereq_('./eachIteratorOptions');

/** Reusable iterator options for `forIn` and `forOwn` */
var forOwnIteratorOptions = {
  'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
  'array': false
};

module.exports = forOwnIteratorOptions;

},{"./eachIteratorOptions":14}],16:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayPool = _dereq_('./arrayPool');

/**
 * Gets an array from the array pool or creates a new one if the pool is empty.
 *
 * @private
 * @returns {Array} The array from the pool.
 */
function getArray() {
  return arrayPool.pop() || [];
}

module.exports = getArray;

},{"./arrayPool":3}],17:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used internally to indicate various things */
var indicatorObject = {};

module.exports = indicatorObject;

},{}],18:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],19:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a DOM node in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.
 */
function isNode(value) {
  // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
  // methods that are `typeof` "string" and still can coerce nodes to strings
  return typeof value.toString != 'function' && typeof (value + '') == 'string';
}

module.exports = isNode;

},{}],20:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var support = _dereq_('../support');

/**
 * The template used to create iterator functions.
 *
 * @private
 * @param {Object} data The data object used to populate the text.
 * @returns {string} Returns the interpolated text.
 */
var iteratorTemplate = function(obj) {

  var __p = 'var index, iterable = ' +
  (obj.firstArg) +
  ', result = ' +
  (obj.init) +
  ';\nif (!iterable) return result;\n' +
  (obj.top) +
  ';';
   if (obj.array) {
  __p += '\nvar length = iterable.length; index = -1;\nif (' +
  (obj.array) +
  ') {  ';
   if (support.unindexedChars) {
  __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
   }
  __p += '\n  while (++index < length) {\n    ' +
  (obj.loop) +
  ';\n  }\n}\nelse {  ';
   } else if (support.nonEnumArgs) {
  __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
  (obj.loop) +
  ';\n    }\n  } else {  ';
   }

   if (support.enumPrototypes) {
  __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
   }

   if (support.enumErrorProps) {
  __p += '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ';
   }

      var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == "prototype")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == "message" || index == "name"))'); }

   if (obj.useHas && obj.keys) {
  __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n';
      if (conditions.length) {
  __p += '    if (' +
  (conditions.join(' && ')) +
  ') {\n  ';
   }
  __p +=
  (obj.loop) +
  ';    ';
   if (conditions.length) {
  __p += '\n    }';
   }
  __p += '\n  }  ';
   } else {
  __p += '\n  for (index in iterable) {\n';
      if (obj.useHas) { conditions.push("hasOwnProperty.call(iterable, index)"); }    if (conditions.length) {
  __p += '    if (' +
  (conditions.join(' && ')) +
  ') {\n  ';
   }
  __p +=
  (obj.loop) +
  ';    ';
   if (conditions.length) {
  __p += '\n    }';
   }
  __p += '\n  }    ';
   if (support.nonEnumShadows) {
  __p += '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ';
   for (k = 0; k < 7; k++) {
  __p += '\n    index = \'' +
  (obj.shadowedProps[k]) +
  '\';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';
          if (!obj.useHas) {
  __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';
   }
  __p += ') {\n      ' +
  (obj.loop) +
  ';\n    }      ';
   }
  __p += '\n  }    ';
   }

   }

   if (obj.array || support.nonEnumArgs) {
  __p += '\n}';
   }
  __p +=
  (obj.bottom) +
  ';\nreturn result';

  return __p
};

module.exports = iteratorTemplate;

},{"../support":40}],21:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used as the max size of the `arrayPool` and `objectPool` */
var maxPoolSize = 40;

module.exports = maxPoolSize;

},{}],22:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],23:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayPool = _dereq_('./arrayPool'),
    maxPoolSize = _dereq_('./maxPoolSize');

/**
 * Releases the given array back to the array pool.
 *
 * @private
 * @param {Array} [array] The array to release.
 */
function releaseArray(array) {
  array.length = 0;
  if (arrayPool.length < maxPoolSize) {
    arrayPool.push(array);
  }
}

module.exports = releaseArray;

},{"./arrayPool":3,"./maxPoolSize":21}],24:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = _dereq_('./isNative'),
    noop = _dereq_('../utilities/noop');

/** Used as the property descriptor for `__bindData__` */
var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

/** Used to set meta data on functions */
var defineProperty = (function() {
  // IE 8 only accepts DOM elements
  try {
    var o = {},
        func = isNative(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch(e) { }
  return result;
}());

/**
 * Sets `this` binding data on a given function.
 *
 * @private
 * @param {Function} func The function to set data on.
 * @param {Array} value The data array to set.
 */
var setBindData = !defineProperty ? noop : function(func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

module.exports = setBindData;

},{"../utilities/noop":42,"./isNative":18}],25:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var forIn = _dereq_('../objects/forIn'),
    isArguments = _dereq_('../objects/isArguments'),
    isFunction = _dereq_('../objects/isFunction'),
    isNode = _dereq_('./isNode'),
    support = _dereq_('../support');

/** `Object#toString` result shortcuts */
var objectClass = '[object Object]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `isPlainObject` which checks if a given value
 * is an object created by the `Object` constructor, assuming objects created
 * by the `Object` constructor have no inherited enumerable properties and that
 * there are no `Object.prototype` extensions.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var ctor,
      result;

  // avoid non Object objects, `arguments` objects, and DOM elements
  if (!(value && toString.call(value) == objectClass) ||
      (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor)) ||
      (!support.argsClass && isArguments(value)) ||
      (!support.nodeClass && isNode(value))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  if (support.ownLast) {
    forIn(value, function(value, key, object) {
      result = hasOwnProperty.call(object, key);
      return false;
    });
    return result !== false;
  }
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  forIn(value, function(value, key) {
    result = key;
  });
  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
}

module.exports = shimIsPlainObject;

},{"../objects/forIn":30,"../objects/isArguments":32,"../objects/isFunction":35,"../support":40,"./isNode":19}],26:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createIterator = _dereq_('./createIterator');

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = createIterator({
  'args': 'object',
  'init': '[]',
  'top': 'if (!(objectTypes[typeof object])) return result',
  'loop': 'result.push(index)'
});

module.exports = shimKeys;

},{"./createIterator":11}],27:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Slices the `collection` from the `start` index up to, but not including,
 * the `end` index.
 *
 * Note: This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @private
 * @param {Array|Object|string} collection The collection to slice.
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @returns {Array} Returns the new array.
 */
function slice(array, start, end) {
  start || (start = 0);
  if (typeof end == 'undefined') {
    end = array ? array.length : 0;
  }
  var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

  while (++index < length) {
    result[index] = array[start + index];
  }
  return result;
}

module.exports = slice;

},{}],28:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createIterator = _dereq_('../internals/createIterator'),
    defaultsIteratorOptions = _dereq_('../internals/defaultsIteratorOptions');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources will overwrite property assignments of previous
 * sources. If a callback is provided it will be executed to produce the
 * assigned values. The callback is bound to `thisArg` and invoked with two
 * arguments; (objectValue, sourceValue).
 *
 * @static
 * @memberOf _
 * @type Function
 * @alias extend
 * @category Objects
 * @param {Object} object The destination object.
 * @param {...Object} [source] The source objects.
 * @param {Function} [callback] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
 * // => { 'name': 'fred', 'employer': 'slate' }
 *
 * var defaults = _.partialRight(_.assign, function(a, b) {
 *   return typeof a == 'undefined' ? b : a;
 * });
 *
 * var object = { 'name': 'barney' };
 * defaults(object, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'employer': 'slate' }
 */
var assign = createIterator(defaultsIteratorOptions, {
  'top':
    defaultsIteratorOptions.top.replace(';',
      ';\n' +
      "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
      '  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
      "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
      '  callback = args[--argsLength];\n' +
      '}'
    ),
  'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
});

module.exports = assign;

},{"../internals/createIterator":11,"../internals/defaultsIteratorOptions":13}],29:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseClone = _dereq_('../internals/baseClone'),
    baseCreateCallback = _dereq_('../internals/baseCreateCallback');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
 * be cloned, otherwise they will be assigned by reference. If a callback
 * is provided it will be executed to produce the cloned values. If the
 * callback returns `undefined` cloning will be handled by the method instead.
 * The callback is bound to `thisArg` and invoked with one argument; (value).
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep=false] Specify a deep clone.
 * @param {Function} [callback] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * var shallow = _.clone(characters);
 * shallow[0] === characters[0];
 * // => true
 *
 * var deep = _.clone(characters, true);
 * deep[0] === characters[0];
 * // => false
 *
 * _.mixin({
 *   'clone': _.partialRight(_.clone, function(value) {
 *     return _.isElement(value) ? value.cloneNode(false) : undefined;
 *   })
 * });
 *
 * var clone = _.clone(document.body);
 * clone.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, callback, thisArg) {
  // allows working with "Collections" methods without using their `index`
  // and `collection` arguments for `isDeep` and `callback`
  if (typeof isDeep != 'boolean' && isDeep != null) {
    thisArg = callback;
    callback = isDeep;
    isDeep = false;
  }
  return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
}

module.exports = clone;

},{"../internals/baseClone":5,"../internals/baseCreateCallback":7}],30:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createIterator = _dereq_('../internals/createIterator'),
    eachIteratorOptions = _dereq_('../internals/eachIteratorOptions'),
    forOwnIteratorOptions = _dereq_('../internals/forOwnIteratorOptions');

/**
 * Iterates over own and inherited enumerable properties of an object,
 * executing the callback for each property. The callback is bound to `thisArg`
 * and invoked with three arguments; (value, key, object). Callbacks may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.move = function(x, y) {
 *   this.x += x;
 *   this.y += y;
 * };
 *
 * _.forIn(new Shape, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
 */
var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
  'useHas': false
});

module.exports = forIn;

},{"../internals/createIterator":11,"../internals/eachIteratorOptions":14,"../internals/forOwnIteratorOptions":15}],31:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createIterator = _dereq_('../internals/createIterator'),
    eachIteratorOptions = _dereq_('../internals/eachIteratorOptions'),
    forOwnIteratorOptions = _dereq_('../internals/forOwnIteratorOptions');

/**
 * Iterates over own enumerable properties of an object, executing the callback
 * for each property. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, key, object). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
 */
var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);

module.exports = forOwn;

},{"../internals/createIterator":11,"../internals/eachIteratorOptions":14,"../internals/forOwnIteratorOptions":15}],32:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var support = _dereq_('../support');

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
 * @example
 *
 * (function() { return _.isArguments(arguments); })(1, 2, 3);
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == argsClass || false;
}
// fallback for browsers that can't detect `arguments` objects by [[Class]]
if (!support.argsClass) {
  isArguments = function(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
      hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
  };
}

module.exports = isArguments;

},{"../support":40}],33:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = _dereq_('../internals/isNative');

/** `Object#toString` result shortcuts */
var arrayClass = '[object Array]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is an array.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
 * @example
 *
 * (function() { return _.isArray(arguments); })();
 * // => false
 *
 * _.isArray([1, 2, 3]);
 * // => true
 */
var isArray = nativeIsArray || function(value) {
  return value && typeof value == 'object' && typeof value.length == 'number' &&
    toString.call(value) == arrayClass || false;
};

module.exports = isArray;

},{"../internals/isNative":18}],34:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = _dereq_('../internals/baseCreateCallback'),
    baseIsEqual = _dereq_('../internals/baseIsEqual');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent to each other. If a callback is provided it will be executed
 * to compare values. If the callback returns `undefined` comparisons will
 * be handled by the method instead. The callback is bound to `thisArg` and
 * invoked with two arguments; (a, b).
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} a The value to compare.
 * @param {*} b The other value to compare.
 * @param {Function} [callback] The function to customize comparing values.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * var copy = { 'name': 'fred' };
 *
 * object == copy;
 * // => false
 *
 * _.isEqual(object, copy);
 * // => true
 *
 * var words = ['hello', 'goodbye'];
 * var otherWords = ['hi', 'goodbye'];
 *
 * _.isEqual(words, otherWords, function(a, b) {
 *   var reGreet = /^(?:hello|hi)$/i,
 *       aGreet = _.isString(a) && reGreet.test(a),
 *       bGreet = _.isString(b) && reGreet.test(b);
 *
 *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
 * });
 * // => true
 */
function isEqual(a, b, callback, thisArg) {
  return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
}

module.exports = isEqual;

},{"../internals/baseCreateCallback":7,"../internals/baseIsEqual":10}],35:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result shortcuts */
var funcClass = '[object Function]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}
// fallback for older versions of Chrome and Safari
if (isFunction(/x/)) {
  isFunction = function(value) {
    return typeof value == 'function' && toString.call(value) == funcClass;
  };
}

module.exports = isFunction;

},{}],36:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = _dereq_('../internals/objectTypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"../internals/objectTypes":22}],37:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = _dereq_('./isArguments'),
    isNative = _dereq_('../internals/isNative'),
    shimIsPlainObject = _dereq_('../internals/shimIsPlainObject'),
    support = _dereq_('../support');

/** `Object#toString` result shortcuts */
var objectClass = '[object Object]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

/**
 * Checks if `value` is an object created by the `Object` constructor.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * _.isPlainObject(new Shape);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && toString.call(value) == objectClass) || (!support.argsClass && isArguments(value))) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

module.exports = isPlainObject;

},{"../internals/isNative":18,"../internals/shimIsPlainObject":25,"../support":40,"./isArguments":32}],38:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** `Object#toString` result shortcuts */
var stringClass = '[object String]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/**
 * Checks if `value` is a string.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
 * @example
 *
 * _.isString('fred');
 * // => true
 */
function isString(value) {
  return typeof value == 'string' ||
    value && typeof value == 'object' && toString.call(value) == stringClass || false;
}

module.exports = isString;

},{}],39:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isArguments = _dereq_('./isArguments'),
    isNative = _dereq_('../internals/isNative'),
    isObject = _dereq_('./isObject'),
    shimKeys = _dereq_('../internals/shimKeys'),
    support = _dereq_('../support');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  if ((support.enumPrototypes && typeof object == 'function') ||
      (support.nonEnumArgs && object.length && isArguments(object))) {
    return shimKeys(object);
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"../internals/isNative":18,"../internals/shimKeys":26,"../support":40,"./isArguments":32,"./isObject":36}],40:[function(_dereq_,module,exports){
(function (global){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = _dereq_('./internals/isNative');

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    objectClass = '[object Object]';

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Used for native method references */
var errorProto = Error.prototype,
    objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object used to flag environments features.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function() {
  var ctor = function() { this.x = 1; },
      object = { '0': 1, 'length': 1 },
      props = [];

  ctor.prototype = { 'valueOf': 1, 'y': 1 };
  for (var key in new ctor) { props.push(key); }
  for (key in arguments) { }

  /**
   * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.argsClass = toString.call(arguments) == argsClass;

  /**
   * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);

  /**
   * Detect if `name` or `message` properties of `Error.prototype` are
   * enumerable by default. (IE < 9, Safari < 5.1)
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');

  /**
   * Detect if `prototype` properties are enumerable by default.
   *
   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
   * (if the prototype or a property on the prototype has been set)
   * incorrectly sets a function's `prototype` property [[Enumerable]]
   * value to `true`.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if `arguments` object indexes are non-enumerable
   * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumArgs = key != 0;

  /**
   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
   *
   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
   * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumShadows = !/valueOf/.test(props);

  /**
   * Detect if own properties are iterated after inherited properties (all but IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.ownLast = props[0] != 'x';

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
   *
   * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
   * and `splice()` functions that fail to remove the last element, `value[0]`,
   * of array-like objects even though the `length` property is set to `0`.
   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);

  /**
   * Detect lack of support for accessing string characters by index.
   *
   * IE < 8 can't access characters by index and IE 8 can only access
   * characters by index on string literals.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';

  /**
   * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)
   * and that the JS engine errors when attempting to coerce an object to
   * a string without a `toString` function.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
  } catch(e) {
    support.nodeClass = true;
  }
}(1));

module.exports = support;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./internals/isNative":18}],41:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],42:[function(_dereq_,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize exports="node" -o ./compat/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

module.exports = noop;

},{}],43:[function(_dereq_,module,exports){
var changeEvent;

module.exports = changeEvent = function(path, value, oldValue) {
  return {
    path: path,
    value: value,
    oldValue: oldValue
  };
};


},{}],44:[function(_dereq_,module,exports){

/* 

ogre.js - MIT Licensed - http://github.com/elucidata/ogre.js 

An object graph manager built with ReactJS in mind.

All cursors are virtual, data operations happen on the root source object.

Meaning, you can create cursors for unpopulated paths and set onChange 
handlers for them, then when/if data is ever set for that path you'll get 
the callback.
 */
var DEBUG, SETTABLE_VALUES, changeEvent, getKeyParts, getKeyPath, ogre, setKeyPath, startsWith, type, warnOnce, _,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = _dereq_('./tools');

DEBUG = "production" === 'development' ? true : false;

SETTABLE_VALUES = 'object array null undefined'.split(' ');

changeEvent = _dereq_('./change-event');

startsWith = _.startsWith, warnOnce = _.warnOnce, getKeyParts = _.getKeyParts, getKeyPath = _.getKeyPath, setKeyPath = _.setKeyPath, type = _.type;

ogre = function(source, lockEditsToRoot) {
  var cursor, _callbacks, _changeGraph, _fullpath, _lastChangePath, _triggerCallbacks;
  if (lockEditsToRoot == null) {
    lockEditsToRoot = false;
  }
  _callbacks = [];
  _lastChangePath = null;
  _fullpath = function(root, key) {
    return _.compact([root, key]).join('.');
  };
  _triggerCallbacks = function(e) {
    var cb, _i, _len;
    for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
      cb = _callbacks[_i];
      if (startsWith(e.path, cb != null ? cb.basepath : void 0)) {
        cb.exec(e);
      }
    }
    return e;
  };
  _changeGraph = function(fullpath, data, replace, silent) {
    var e;
    if (e = setKeyPath(source, fullpath, data, replace)) {
      if (silent) {
        return;
      }
      _lastChangePath = e.path;
      _triggerCallbacks(e);
      _lastChangePath = null;
      return warnOnce.clear();
    }
  };
  cursor = function(rootpath, readonly) {
    if (readonly == null) {
      readonly = false;
    }
    return {
      path: rootpath,
      get: function(path, opts) {
        var data, kind;
        if (arguments.length === 1 && type(path) === 'object') {
          opts = path;
          path = '';
        }
        data = getKeyPath(source, _fullpath(rootpath, path));
        kind = type(data);
        if ((kind === 'undefined' || kind === 'null') && ((opts != null ? opts.or : void 0) != null)) {
          return opts.or;
        } else if ((opts != null ? opts.clone : void 0) === false) {
          return data;
        } else {
          return _.clone(data);
        }
      },
      set: function(path, data, replace, silent) {
        var fullpath, kind;
        if (replace == null) {
          replace = false;
        }
        if (silent == null) {
          silent = false;
        }
        if (readonly) {
          console.warn("You're trying to set data on a readonly cursor!");
          return this;
        }
        if ((kind = type(path)) !== 'string') {
          if (__indexOf.call(SETTABLE_VALUES, kind) >= 0) {
            silent = replace;
            replace = data;
            data = path;
            path = '';
          } else {
            console.warn("The first parameter to .set() is an invalid type:", kind);
            return this;
          }
        }
        fullpath = _fullpath(rootpath, path);
        if (_lastChangePath != null) {
          if (startsWith(path, _lastChangePath)) {
            warnOnce("You're making changes in the same path (" + path + ") within an onChange handler. This can lead to infinite loops, be careful.");
          }
        }
        _changeGraph(fullpath, data, replace, silent);
        return this;
      },

      /*
       *   Params: 
       *     .map string, callback
       *     .map callback
       *   Callback Format:
       *     callback(value, idx|key, array|object)
       */
      map: function(path, fn) {
        var idx, key, result, value, _i, _len, _results, _results1;
        fn = arguments[arguments.length - 1];
        result = arguments.length > 1 ? this.get(arguments[0]) : this.get();
        fn || (fn = function(x) {
          return x;
        });
        switch (type(result)) {
          case 'array':
            _results = [];
            for (idx = _i = 0, _len = result.length; _i < _len; idx = ++_i) {
              value = result[idx];
              _results.push(fn(value, idx, result));
            }
            return _results;
            break;
          case 'object':
            _results1 = [];
            for (key in result) {
              value = result[key];
              _results1.push(fn(value, key, result));
            }
            return _results1;
            break;
          case 'null':
          case 'undefined':
            return [];
          default:
            return [fn(result)];
        }
      },
      hasChanged: function(path) {
        var fullpath;
        if (path == null) {
          path = '';
        }
        if (_lastChangePath == null) {
          return false;
        }
        fullpath = _fullpath(rootpath, path);
        return startsWith(_lastChangePath, fullpath);
      },
      exists: function(path) {
        var unlikelyValue;
        if (path == null) {
          path = '';
        }
        unlikelyValue = '*^%^*(*&!';
        return this.get(path, {
          or: unlikelyValue
        }) !== unlikelyValue;
      },
      isEmpty: function(path) {
        var kind;
        if (path == null) {
          path = '';
        }
        kind = type(this.get(path));
        return kind === 'null' || kind === 'undefined';
      },
      isNotEmpty: function(path) {
        if (path == null) {
          path = '';
        }
        return !this.isEmpty(path);
      },
      isNull: function(path) {
        if (path == null) {
          path = '';
        }
        return type(this.get(path)) === 'null';
      },
      isMissing: function(path) {
        if (path == null) {
          path = '';
        }
        return type(this.get(path)) === 'undefined';
      },
      cursor: function(path, readonly) {
        var fullpath;
        fullpath = _fullpath(rootpath, path);
        if (lockEditsToRoot) {
          return cursor(fullpath, true);
        } else {
          return cursor(fullpath, readonly);
        }
      },
      listenerCount: function(reportAll) {
        var cb;
        if (reportAll == null) {
          reportAll = false;
        }
        if (reportAll === true && rootpath === '') {
          return _callbacks.length;
        } else {
          return ((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
              cb = _callbacks[_i];
              if (cb.cursor === this) {
                _results.push(cb);
              }
            }
            return _results;
          }).call(this)).length;
        }
      },
      _listenerSummary: function() {
        var content, data, info, key, paths, total, _i, _j, _len, _len1, _name, _ref, _ref1;
        paths = {};
        total = 0;
        for (_i = 0, _len = _callbacks.length; _i < _len; _i++) {
          info = _callbacks[_i];
          total += 1;
          data = paths[_name = info.basepath] || (paths[_name] = {
            listeners: 0,
            cursors: []
          });
          data.listeners += 1;
          if (_ref = info.cursor, __indexOf.call(data.cursors, _ref) < 0) {
            data.cursors.push(info.cursor);
          }
        }
        content = ["" + total + " listeners in ogre."];
        _ref1 = _.keys(paths).sort();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          key = _ref1[_j];
          info = paths[key];
          content.push("  " + (key || '<root>') + ":");
          content.push("    - listeners " + info.listeners);
          content.push("    -   cursors " + info.cursors.length);
        }
        return content.join("\n");
      },
      onChange: function(callback, path) {

        /** path is optional, defaults to path of cursor */
        var fullpath;
        if ("production" === 'development') {
          console.log(':cursor: start listening for changes', rootpath || '<root>');
        }
        fullpath = path != null ? _fullpath(rootpath, path) : rootpath;
        _callbacks.push({
          exec: callback,
          basepath: fullpath,
          cursor: this
        });
        return this;
      },
      stopListening: function(clearAll) {
        var callback, i, idx, _i, _j, _len, _len1, _ref;
        if (clearAll == null) {
          clearAll = false;
        }
        if (clearAll === true && rootpath === '') {
          if ("production" === 'development') {
            console.log(':cursor: clearing all callbacks', rootpath || '<root>');
          }
          _callbacks.length = 0;
        } else {
          idx = [];
          for (i = _i = 0, _len = _callbacks.length; _i < _len; i = ++_i) {
            callback = _callbacks[i];
            if (callback.cursor === this) {
              idx.push(i);
            }
          }
          if ("production" === 'development') {
            console.log(':cursor: stop listening for changes', rootpath || '<root>');
          }
          _ref = idx.sort().reverse();
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            i = _ref[_j];
            _callbacks.splice(i, 1);
          }
        }
        return this;
      },
      stopListeningAt: function(path) {
        var callback, i, idx, _i, _j, _len, _len1, _ref;
        if ((path != null) && !_.isEmpty(path)) {
          _fullpath(rootpath, path);
          idx = [];
          for (i = _i = 0, _len = _callbacks.length; _i < _len; i = ++_i) {
            callback = _callbacks[i];
            if (startsWith(path, callback.basepath)) {
              idx.push(i);
            }
          }
          if ("production" === 'development') {
            console.log(':cursor: stop listening for changes at', fullpath);
          }
          _ref = idx.sort().reverse();
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            i = _ref[_j];
            _callbacks.splice(i, 1);
          }
        } else {
          if ("production" === 'development') {
            console.warn("You must specify a path to stop listening to.");
          }
        }
        return this;
      },
      dispose: function() {
        return this.stopListening(rootpath === '');
      }
    };
  };
  return cursor('', lockEditsToRoot);
};

module.exports = ogre;


},{"./change-event":43,"./tools":45}],45:[function(_dereq_,module,exports){
var changeEvent, _;

changeEvent = _dereq_('./change-event');

module.exports = _ = {
  extend: _dereq_('lodash-node/compat/objects/assign'),
  clone: _dereq_('lodash-node/compat/objects/clone'),
  compact: _dereq_('lodash-node/compat/arrays/compact'),
  isPlainObject: _dereq_('lodash-node/compat/objects/isPlainObject'),
  isEqual: _dereq_('lodash-node/compat/objects/isEqual'),
  keys: _dereq_('lodash-node/compat/objects/keys'),
  startsWith: function(str, starts) {
    if (starts === '') {
      return true;
    }
    if (str === null || starts === null) {
      return false;
    }
    str = String(str);
    starts = String(starts);
    return str.length >= starts.length && str.slice(0, starts.length) === starts;
  },
  type: (function() {
    var classToType, elemParser, name, _i, _len, _ref, _toString;
    _toString = Object.prototype.toString;
    elemParser = /\[object HTML(.*)\]/;
    classToType = {};
    _ref = "Array Boolean Date Function NodeList Null Number RegExp String Undefined ".split(" ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    return function(obj) {
      var found, strType;
      strType = _toString.call(obj);
      if (found = classToType[strType]) {
        return found;
      } else if (found = strType.match(elemParser)) {
        return found[1].toLowerCase();
      } else {
        return "object";
      }
    };
  })(),
  warnOnce: (function() {
    var api, count;
    count = 0;
    api = function(msg) {
      if (count === 0) {
        console.warn(msg);
      }
      return count += 1;
    };
    api.clear = function() {
      return count = 0;
    };
    return api;
  })(),
  getKeyParts: function(keypath) {
    return _.compact(keypath.split('.'));
  },
  getKeyPath: function(source, keypath, create) {
    var key, obj, parts;
    if (keypath == null) {
      keypath = '';
    }
    if (create == null) {
      create = false;
    }
    parts = _.getKeyParts(keypath);
    obj = source;
    while ((obj != null) && parts.length) {
      key = parts.shift();
      if (!obj[key]) {
        if (create === true) {
          obj[key] = {};
        }
      }
      obj = obj[key];
    }
    return obj;
  },
  setKeyPath: function(source, keypath, data, replace) {
    var container, current, key, merged, parts;
    if (keypath == null) {
      keypath = '';
    }
    parts = _.getKeyParts(keypath);
    key = parts.pop();
    container = parts.length ? _.getKeyPath(source, parts.join('.'), true) : source;
    if (_.isEqual(container[key], data)) {
      return false;
    }
    current = container[key];
    if (replace === true || !_.isPlainObject(data)) {
      container[key] = data;
    } else {
      merged = _.extend(_.clone(current || {}), data);
      if (_.isEqual(current, merged)) {
        return false;
      }
      container[key] = merged;
      data = merged;
    }
    return changeEvent(keypath, data, current);
  }
};


},{"./change-event":43,"lodash-node/compat/arrays/compact":1,"lodash-node/compat/objects/assign":28,"lodash-node/compat/objects/clone":29,"lodash-node/compat/objects/isEqual":34,"lodash-node/compat/objects/isPlainObject":37,"lodash-node/compat/objects/keys":39}]},{},[44])
(44)
});