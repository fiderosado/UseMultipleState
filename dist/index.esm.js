import { useState } from 'react';

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

var useMultipleState = function useMultipleState(initialStates) {
  var _useState = useState(initialStates),
    _useState2 = _slicedToArray(_useState, 2),
    states = _useState2[0],
    setStates = _useState2[1];
  var getStateManager = function getStateManager(key) {
    var methods = {
      get: function get() {
        return key ? states[key] : _objectSpread2({}, states);
      },
      put: function put(valueOrUpdater, callback) {
        setStates(function (prev) {
          if (key) {
            var currentValue = prev[key];
            var newValue;
            if (typeof valueOrUpdater === 'function') {
              newValue = valueOrUpdater(currentValue);
            } else if (_typeof(currentValue) === 'object' && currentValue !== null && _typeof(valueOrUpdater) === 'object' && valueOrUpdater !== null && !Array.isArray(valueOrUpdater)) {
              // Mezclar objetos
              newValue = _objectSpread2(_objectSpread2({}, currentValue), valueOrUpdater);
            } else {
              newValue = valueOrUpdater;
            }
            var result = _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, key, newValue));
            if (callback) callback(result[key]); // Ejecutar callback con el nuevo valor
            return result;
          } else {
            // Actualizar múltiples claves
            if (_typeof(valueOrUpdater) !== 'object' || valueOrUpdater === null) {
              throw new Error('Para actualizar todo el estado, debe proporcionarse un objeto o Clave de objeto para actualizar una especifica.');
            }
            var validUpdates = Object.keys(valueOrUpdater).reduce(function (result, updateKey) {
              if (updateKey in prev) {
                result[updateKey] = valueOrUpdater[updateKey];
              }
              return result;
            }, {});
            return _objectSpread2(_objectSpread2({}, prev), validUpdates);
          }
        });
      }
    };
    return new Proxy(methods, {
      get: function get(target, prop) {
        if (prop in target) {
          return target[prop];
        }
        // Si no se llama un método, devuelve directamente el valor
        if (prop === Symbol.toPrimitive || prop === 'valueOf') {
          return function () {
            return target.get();
          };
        }
        return target.get();
      },
      apply: function apply(target, thisArg, args) {
        return target.get(); // Devuelve el valor por defecto si se usa como función
      }
    });
  };
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
  var state = function state(key) {
    if (key && !(key in states)) {
      throw new Error("El estado con clave \"".concat(key, "\" no existe."));
    }
    return getStateManager(key);
  };
  return {
    state: state,
    getAll: getAll
  };
};

// Comandos relevantes:
// - Para construir el proyecto: npm run build
// - Para ejecutar tests: npm jest
// - Para publicar: npm publish

export { useMultipleState as default };
//# sourceMappingURL=index.esm.js.map
