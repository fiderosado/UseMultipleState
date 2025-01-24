```markdown
# useMultipleState

`useMultipleState` es un hook de React que permite gestionar múltiples estados en un solo hook.

## Instalación

Para instalar `useMultipleState`, puedes usar npm:

```sh
npm install usemultiplestate
```

## Uso

A continuación se muestra un ejemplo de cómo usar `useMultipleState` en un componente de React:

```javascript
import React from 'react';
import useMultipleState from 'usemultiplestate';

const MyComponent = () => {
  const { state, getAll } = useMultipleState({ count: 0, name: 'John' });

  const incrementCount = () => {
    state.count.put((prev) => prev + 1);
  };

  const updateName = (newName) => {
    state.name.put(newName);
  };

  return (
    <div>
      <p>Count: {state.count.get()}</p>
      <button onClick={incrementCount}>Increment Count</button>
      <p>Name: {state.name.get()}</p>
      <input
        type="text"
        value={state.name.get()}
        onChange={(e) => updateName(e.target.value)}
      />
    </div>
  );
};

export default MyComponent;
```

## API

### `useMultipleState(initialStates)`

Este hook permite gestionar múltiples estados en un solo hook.

#### Parámetros

- `initialStates` (object): Un objeto que contiene los estados iniciales.

#### Retorna

- `state` (Proxy): Un objeto proxy que permite obtener y actualizar los estados.
- `getAll` (function): Una función que permite obtener todos los estados o estados específicos.

### `state`

El objeto `state` es un proxy que permite obtener y actualizar los estados.

#### Métodos

- `get()`: Obtiene el valor del estado.
- `put(valueOrUpdater, callback)`: Actualiza el estado con el valor o función proporcionada.

### `getAll(keys)`

Obtiene todos los estados o estados específicos.

#### Parámetros

- `keys` (array, opcional): Un array de claves de los estados que se desean obtener. Si no se proporciona, se obtendrán todos los estados.

#### Retorna

- Un objeto que contiene los estados solicitados.

## TEST 
- Para ejecutar las pruebas, ejecute el siguiente comando:
```bash
npx vitest
```
```javascript
 ✓ tests/useMultipleState.test.js (11)
   ✓ Test UseMultipleState Hook (11)
     ✓ Fusionando el estado de objetos : Estado inicial = { key1: { a: 1, b: 2 }, key2: 42 , key3: true }  (4)
       ✓ Cambiar "key1" por un objeto nuevo : state.key1.put({ b: 3, c: 4 }) , expected : key1 = { key1: { a: 1, b: 3, c: 4 }, key2: 42 , key3: true}
       ✓ Cambiar "key1" por un nuevo valor  : state.key1.put('newValue2') , expected : 'newValue2'
       ✓ Cambiar "ALL"  por un nuevo objeto : state.put({ key1: 'newValue1', key3: false }) , expected { key1: 'newValue1', key2: 42, key3: false }
       ✓ Generar "error" al cambiar "ALL" con un valor que no sea de objeto : state().put('invalidUpdate') , expected :toThrowError(solo objetos)
     ✓ Accediendo al estado de objetos : Estado inicial = { key1: { a: 1, b: 2 }, key2: 42 , key3: true }  (7)
       ✓ Obteniendo "ALL" en el StateManager con metodo "getAll()"
       ✓ Obteniendo "key1, key2" con metodo "state.key1.get()", cuando el valor es un string o entero : expected : key1: toBe('value1') , key2: toBe(42)
       ✓ Obteniendo "key1, key2" con metodo "state.key()", sin el metodo .get(): expected : key1: toBe('value1') , key2: toBe(42)
       ✓ Generar "error" al acceder a una clave inexistente: state.key4() (key4 no exist : null)
       ✓ Generar "error" al acceder a una clave inexistente: state.key4.get() (key4 no exist : null)
       ✓ Obteniendo estados específicos con getAll con metodo "toEqual" : getAll(['key1', 'key3']) , expected : toEqual({ key1: { a: 1, b: 2 }, key3: true })
       ✓ Generar "error" si se llama a getAll con un argumento que no sea una matriz : getAll('key1') , expected : toThrowError(debe ser array de claves)

 Test Files  1 passed (1)
      Tests  11 passed (11)

```

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Envía un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autor

Fidel Remedios Rosado

## Enlaces

- [Repositorio](https://github.com/fiderosado/UseMultipleState)
- [Issues](https://github.com/fiderosado/UseMultipleState/issues)
- [Página principal](https://github.com/fiderosado/UseMultipleState#readme)
```