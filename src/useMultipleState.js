import { useState } from "react";

function useMultipleState(initialStates) {
    const [states, setStates] = useState(initialStates);
    
    const getStateManager = (key) => {
        const methods = {
            get: () => (key ? states[key] : { ...states }),
            put: (valueOrUpdater) => {
                setStates((prev) => {
                    if (key) {
                        const currentValue = prev[key];
                        let newValue;
                        
                        if (typeof valueOrUpdater === "function") {
                            newValue = valueOrUpdater(currentValue);
                        } else if (
                            typeof currentValue === "object" &&
                            currentValue !== null &&
                            typeof valueOrUpdater === "object" &&
                            valueOrUpdater !== null
                        ) {
                            // Mezclar objetos
                            newValue = { ...currentValue, ...valueOrUpdater };
                        } else {
                            newValue = valueOrUpdater;
                        }
                        
                        return {
                            ...prev,
                            [key]: newValue,
                        };
                    } else {
                        // Actualizar múltiples claves
                        if (
                            typeof valueOrUpdater !== "object" ||
                            valueOrUpdater === null
                        ) {
                            throw new Error(
                                "Para actualizar todo el estado, debe proporcionarse un objeto o Clave de objeto para actualizar una especifica."
                            );
                        }
                        
                        const validUpdates = Object.keys(valueOrUpdater).reduce(
                            (result, updateKey) => {
                                if (updateKey in prev) {
                                    result[updateKey] = valueOrUpdater[updateKey];
                                }
                                return result;
                            },
                            {}
                        );
                        
                        return {
                            ...prev,
                            ...validUpdates,
                        };
                    }
                });
            },
        }
        return new Proxy(methods, {
            get(target, prop) {
                if (prop in target) {
                    return target[prop];
                }
                // Si no se llama un método, devuelve directamente el valor
                if (prop === Symbol.toPrimitive || prop === "valueOf") {
                    return () => target.get();
                }
                return target.get();
            },
            apply(target, thisArg, args) {
                return target.get(); // Devuelve el valor por defecto si se usa como función
            },
        });
    }
    
    const getAll = (keys) => {
        if (!keys) {
            return { ...states };
        }
        if (!Array.isArray(keys)) {
            throw new Error("La entrada a getAll debe ser un array de claves.");
        }
        return keys.reduce((result, key) => {
            if (key in states) {
                result[key] = states[key];
            } else {
                throw new Error(`El estado con clave "${key}" no existe.`);
            }
            return result;
        }, {});
    };
    
    return {
        state: (key) => {
            if (key && !(key in states)) {
                throw new Error(`El estado con clave "${key}" no existe.`);
            }
            return getStateManager(key);
        },
        getAll,
    };
}


module.exports = useMultipleState;
