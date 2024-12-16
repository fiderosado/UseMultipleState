import { useState } from "react";

function useMultipleState(initialStates) {

    // Almacenamos el estado como un objeto clave-valor
    const [states, setStates] = useState(initialStates);

    // Creamos una función para actualizar estados específicos
    const getStateManager = (key) => ({
        get: () => states[key], // Obtener el valor actual del estado
        put: (valueOrUpdater) => {
            setStates((prev) => ({
                ...prev,
                [key]:
                    typeof valueOrUpdater === "function"
                        ? valueOrUpdater(prev[key]) // Si es una función, actualizamos con el resultado
                        : valueOrUpdater, // Si no, actualizamos directamente con el valor
            }));
        },
    });

    // Función para obtener todos los estados actuales
    /*const getAll = () => ({ ...states });*/

    const getAll = (keys) => {
        if (!keys) {
            return { ...states }; // Si no se pasan claves, devolvemos todos los estados
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

    // Retornamos una función que permite gestionar estados individuales
    return {
        state : (key) => {
            if (!(key in states)) {
                throw new Error(`El estado con clave "${key}" no existe.`);
            }
            return getStateManager(key);
        },
        getAll,
    };
}

module.exports = useMultipleState;
