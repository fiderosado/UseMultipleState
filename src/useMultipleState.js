import { useState } from "react";

/***
 * UseMultipleState is a powerful hook that allows you to manage multiple states in a single hook.
 * @param initialStates
 * @returns {(function(): *)|putAll|{getAll: ((function(*): ({[p: string]: *}))|*), state: {}}|((function(): null) & {get: (function(): null), put: put})}
 */
const useMultipleState = (initialStates) => {
  const [states, setStates] = useState(initialStates);
  /***
   * createStateManager is a helper function that creates a state manager for a specific key.
   * @param key
   * @returns {{get: ((function(): (function()))|*), value: *, put: put}}
   */
  const createStateManager = (key) => {
    const value = states[key];
    const put = (valueOrUpdater, callback) => {
      setStates((prev) => {
        const currentValue = prev[key];
        let newValue;
        if (typeof valueOrUpdater === "function") {
          newValue = valueOrUpdater(currentValue);
        } else if (
            typeof currentValue === "object" &&
            currentValue !== null &&
            typeof valueOrUpdater === "object" &&
            valueOrUpdater !== null &&
            !Array.isArray(valueOrUpdater)
        ) {
          newValue = { ...currentValue, ...valueOrUpdater };
        } else {
          newValue = valueOrUpdater;
        }
        const updatedState = { ...prev, [key]: newValue };
        if (callback) callback(updatedState[key]);
        return updatedState;
      });
    };
    return {
      value,
      get: () => {
        if (!(key in states)) {
          console.warn(`La clave "${key}" no existe en el estado.`);
          return ()=> {}
        }
        console.log("este es el valor" , key , value)
        return value
      },
      put,
    };
  };
  /***
   * putAll is a function that allows you to update multiple states at once.
   * @param valueOrUpdater
   * @param callback
   */
  const putAll = (valueOrUpdater, callback) => {
    setStates((prev) => {
      let newState;
      if (typeof valueOrUpdater === "function") {
        newState = valueOrUpdater(prev);
      } else if (
        typeof valueOrUpdater === "object" &&
        valueOrUpdater !== null
      ) {
        newState = { ...prev, ...valueOrUpdater };
      } else {
        throw new Error(
          "Para actualizar todo el estado, debe proporcionarse un objeto o Clave de objeto para actualizar una especifica."
        );
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
  const getAll = (keys) => {
    if (!keys) {
      return { ...states }
    }
    if (!Array.isArray(keys)) {
      throw new Error('La entrada a getAll debe ser un array de claves.')
    }
    return keys.reduce((result, key) => {
      if (key in states) {
        result[key] = states[key]
      } else {
        throw new Error(`El estado con clave "${key}" no existe.`)
      }
      return result
    }, {})
  }
  /***
   * state is a proxy object that allows you to get and update the states.
   * @type {{}}
   */
  const state = new Proxy(
      {},
      {
        /***
         * get is a trap that allows you to get the states.
         * @param _
         * @param prop
         * @returns {(function(): *)|putAll|((function(): null) & {get: (function(): null), put: put})}
         */
        get(_, prop) {
          if (prop === "put") {
            return putAll;
          }
          if (prop in states) {

            const { value, put , get } = createStateManager(prop);
            /***
             * getterFunction is a function that allows you to get and update the specific state.
             */
            const getterFunction = () => value;
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
          const defaultValue = Object.assign(
            () => {
              return null;
            },
            {
              get: () => {
                return null;
              },
              put: () => {},
            }
          );
          return defaultValue
        },
      }
  );
  return {
    state,
    getAll
  };
};

export default useMultipleState;
