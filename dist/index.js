'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

/***
 * UseMultipleState is a powerful hook that allows you to manage multiple states in a single hook.
 * @param initialStates
 * @returns {(function(): *)|putAll|{getAll: ((function(*): ({[p: string]: *}))|*), state: {}}|((function(): null) & {get: (function(): null), put: put})}
 */
var useMultipleState = function useMultipleState(initialStates) {
  var _useState = react.useState(initialStates),
    _useState2 = _slicedToArray(_useState, 2),
    states = _useState2[0],
    setStates = _useState2[1];
  /***
   * createStateManager is a helper function that creates a state manager for a specific key.
   * @param key
   * @returns {{get: ((function(): (function()))|*), value: *, put: put}}
   */
  var createStateManager = function createStateManager(key) {
    var put = function put(valueOrUpdater, callback) {
      setStates(function (prev) {
        var currentValue = prev[key];
        var newValue;
        if (typeof valueOrUpdater === 'function') {
          newValue = valueOrUpdater(prev);
        } else if (_typeof(currentValue) === 'object' && currentValue !== null && _typeof(valueOrUpdater) === 'object' && valueOrUpdater !== null && !Array.isArray(valueOrUpdater)) {
          newValue = _objectSpread2(_objectSpread2({}, currentValue), valueOrUpdater);
        } else {
          newValue = valueOrUpdater;
        }
        if (JSON.stringify(prev) === JSON.stringify(newValue)) {
          return prev;
        }
        var updatedState = _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, key, newValue));
        if (callback) callback(updatedState[key]);
        return updatedState;
      });
    };
    return {
      value: !(key in states) ? null : states[key],
      get: function get() {
        if (!(key in states)) {
          console.warn("La clave \"".concat(key, "\" no existe en el estado."));
          return function () {
            return null;
          };
        }
        return states[key];
      },
      put: put
    };
  };
  /***
   * putAll is a function that allows you to update multiple states at once.
   * @param valueOrUpdater
   * @param callback
   */
  var putAll = function putAll(valueOrUpdater, callback) {
    setStates(function (prev) {
      var newState;
      if (typeof valueOrUpdater === 'function') {
        newState = valueOrUpdater(prev);
      } else if (_typeof(valueOrUpdater) === 'object' && valueOrUpdater !== null) {
        newState = _objectSpread2(_objectSpread2({}, prev), valueOrUpdater);
      } else {
        throw new Error('Para actualizar todo el estado, debe proporcionarse un objeto o Clave de objeto para actualizar una especifica.');
      }
      if (callback) callback(newState);
      return newState;
    });
  };
  /***
   * getAll is a function that allows you to get all the states or specific states.
   * @param keys
   * @returns {{[p: string]: *}|*}
   */
  var getAll = function getAll(keys) {
    if (!keys) {
      return _objectSpread2({}, states);
    }
    if (!Array.isArray(keys)) {
      throw new Error('La entrada a getAll debe ser un array de claves.');
    }
    return keys.reduce(function (result, key) {
      if (key in states) {
        result[key] = states[key];
      } else {
        throw new Error("El estado con clave \"".concat(key, "\" no existe."));
      }
      return result;
    }, {});
  };
  /***
   * state is a proxy object that allows you to get and update the states.
   * @type {{}}
   */
  var state = new Proxy({}, {
    /***
     * get is a trap that allows you to get the states.
     * @param _
     * @param prop
     * @returns {(function(): *)|putAll|((function(): null) & {get: (function(): null), put: put})}
     */
    get: function get(_, prop) {
      if (prop === 'put') {
        return putAll;
      }
      if (prop in states) {
        var _createStateManager = createStateManager(prop),
          value = _createStateManager.value,
          put = _createStateManager.put,
          get = _createStateManager.get;
        /***
         * getterFunction is a function that allows you to get and update the specific state.
         */
        var getterFunction = function getterFunction() {
          return value;
        };
        /***
         * put is a function that allows you to update the specific state.
         * @type {put}
         */
        getterFunction.put = put;
        /***
         * get is a function that allows you to get the specific state.
         * @type {(function(): function())|*}
         */
        getterFunction.get = get;
        return getterFunction;
      }
      /***
       * defaultValue is a function that returns null if the state does not exist.
       * @type {(function(): null) & {get: (function(): null), put: defaultValue.put}}
       */
      var defaultValue = Object.assign(function () {
        return states;
      }, {
        get: function get() {
          return states;
        },
        put: function put() {}
      });
      return defaultValue;
    }
  });
  return {
    state: state,
    states: states,
    getAll: getAll
  };
};

exports["default"] = useMultipleState;
//# sourceMappingURL=index.js.map
