# UseMultipleState Hook

`UseMultipleState` es un hook personalizado para React que permite gestionar múltiples estados de forma centralizada y
flexible. Este hook es ideal para manejar múltiples valores relacionados sin necesidad de usar varios `useState`,
ofreciendo además una API sencilla y poderosa para interactuar con ellos.

## Instalación

### 1. Instalación desde npm

Primero, instala el paquete desde npm:

```bash
npm install usemultiplestate
```

### 2. Importación y uso

Importa el hook en tu proyecto:

```javascript
const useMultipleState = require("useMultipleState");

function App () {
  const { state, getAll } = useMultipleState({ quantity: 0, price: 0 });

  const min = 0;

  return (
    <div>
      <h1>Gestión de Múltiples Estados</h1>
      <p>Quantity: {state("quantity").get()}</p>
      <p>Price: {state("price").get()}</p>

      <button onClick={() => state("quantity").put((prev) => Math.max(min, prev + 1))}>
        Increment Quantity
      </button>

      <button onClick={() => state("price").put((prev) => Math.max(min, prev + 10))}>
        Increment Price by 10
      </button>

      <button onClick={() => console.log("All States:", getAll())}>
        Log All States
      </button>
    </div>
  );
}

module.exports = App;
```

## Características

### 1. Gestión centralizada de múltiples estados

Puedes inicializar y gestionar varios estados simultáneamente a través de un objeto clave-valor, donde cada clave
representa un estado individual.

```javascript
const { state, getAll } = useMultipleState({ quantity: 0, price: 0 });
```

### 2. Acceso individual a cada estado

Puedes acceder al valor actual de un estado y actualizarlo usando métodos específicos:

- **`get()`**: Devuelve el valor actual del estado.
- **`put(valueOrUpdater)`**: Actualiza el estado con un valor nuevo o utilizando una función que reciba el valor
  anterior.

Ejemplo:

```javascript
state("quantity").get(); // Obtiene el valor actual de "quantity"
state("quantity").put(10); // Actualiza el valor de "quantity" a 10
state("quantity").put((prev) => prev + 1); // Incrementa el valor de "quantity" en 1
```

### 3. Actualización basada en el estado previo

El método `put` soporta funciones que permiten calcular el nuevo estado basado en el valor previo. Esto es útil para
operaciones dinámicas:

```javascript
state("price").put((prev) => Math.max(0, prev + 10));
```

### 4. Obtención de todos los estados actuales

El método `getAll` devuelve un objeto con todos los estados actuales, ideal para depuración o procesamiento
centralizado:

```javascript
const allStates = getAll();
console.log(allStates); // { quantity: 0, price: 0 }
```

Ahora acepta un array opcional (`keys`).
Si `keys` es `undefined`, devuelve todos los estados como antes.
Si `keys` es un array, filtra los estados según las claves proporcionadas y lanza un error si una clave no existe en los
estados actuales.

```javascript
// Obtener un subconjunto de estados
const subset = getAll(["name", "city"]); // { name: "Bob", city: "NY" }

// Obtener todos los estados
const allStates = getAll(); // { name: "Bob", age: 25, city: "NY" }
```

### 5. Validación de claves

Si intentas acceder o actualizar un estado que no existe, se lanza un error descriptivo para evitar comportamientos
inesperados:

```javascript
state("invalidKey"); // Lanza un error: "El estado con clave \"invalidKey\" no existe."
```

## API

### Inicialización

```javascript
const { state, getAll } = useMultipleState(initialStates);
```

- **`initialStates`**: Un objeto clave-valor donde cada clave representa un estado y su valor inicial.

### Métodos

#### `state(key)`

- **`key`**: Nombre del estado que deseas gestionar.
- Retorna un objeto con los métodos:
    - **`get()`**: Devuelve el valor actual del estado.
    - **`put(valueOrUpdater, callback)`**: Actualiza el estado con un valor o una función que recibe el valor anterior.
      Adicionalmente, puedes proporcionar un callback para realizar acciones tras la actualización.

#### `getAll(keys)`

- Retorna un objeto con todos los estados actuales o un subconjunto basado en las claves proporcionadas.
- **`keys`**: (Opcional) Un array de claves para filtrar los estados.

## Pruebas

Las pruebas están escritas utilizando `vitest` y `@testing-library/react`. Se pueden encontrar en el archivo `test.js`.

### Ejecución de pruebas

```bash
npx vitest
```

### Casos de prueba principales

1. **Fusionar objetos:** Actualizar un estado con un nuevo objeto mezcla las propiedades del estado anterior con las
   nuevas.
2. **Actualizar un estado específico:** Cambiar el valor de una clave específica en el estado.
3. **Actualizar todos los estados:** Modificar múltiples claves a la vez.
4. **Errores esperados:** Asegurar que se lanzan errores al proporcionar argumentos no válidos o claves inexistentes.
5. **Acceso a estados específicos:** Verificar el retorno correcto de `getAll` y `state(key).get()`.

Ejemplo de prueba:

```javascript
describe('Actualizar estado específico', () => {
  it('Debería fusionar objetos correctamente', () => {
    const { result } = renderHook(() => useMultipleState({ key1: { a: 1 }, key2: 42 }));
    act(() => {
      result.current.state('key1').put({ b: 2 });
    });
    expect(result.current.state('key1').get()).toEqual({ a: 1, b: 2 });
  });
});
```

## Beneficios

- **Flexibilidad:** Soporte para valores y funciones al actualizar estados.
- **Escalabilidad:** Facilita la gestión de múltiples estados sin necesidad de múltiples llamadas a `useState`.
- **Validación:** Previene errores al intentar acceder a estados no definidos.
- **Depuración:** Ofrece una forma centralizada de obtener todos los estados actuales.

## Contribuir

Siente libre de abrir un issue o enviar un pull request para mejorar este módulo. ¡Tu retroalimentación es bienvenida!

