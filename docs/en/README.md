# useMultipleState Hook

`useMultipleState` is a custom hook for React that allows you to manage multiple states in a centralized and flexible way. This hook is ideal for handling multiple related values ​​without having to use multiple `useState`s`, and also offers a simple and powerful API to interact with them.

## Features

### 1. Centralized management of multiple states

You can initialize and manage multiple states simultaneously through a key-value object, where each key represents an individual state.

```javascript
const { state, getAll } = useMultipleState({ quantity: 0, price: 0 });
```

### 2. Individual access to each state

You can access the current value of a state and update it using specific methods:

- **`get()`**: Returns the current value of the state.
- **`put(valueOrUpdater)`**: Updates the state with a new value or by using a function that receives the previous value.

Example:

```javascript
state("quantity").get(); // Get the current value of "quantity"
state("quantity").put(10); // Update the value of "quantity" to 10
state("quantity").put((prev) => prev + 1); // Increment the value of "quantity" by 1
```

### 3. Updating based on previous state

The `put` method supports functions that allow you to calculate the new state based on the previous value. This is useful for dynamic operations:

```javascript
state("price").put((prev) => Math.max(0, prev + 10));
```

### 4. Getting all current states

The `getAll` method returns an object with all current states, ideal for debugging or centralized processing:

```javascript
const allStates = getAll();
console.log(allStates); // { quantity: 0, price: 0 }
```
Changes made:
Modified getAll:
Now accepts an optional array (keys).
If keys is undefined, returns all states as before.
If keys is an array, filters states based on the provided keys.
Throws an error if a key does not exist in the current states.

```javascript
// Get a subset of states
const subset = getAll(["name", "city"]); // { name: "Bob", city: "NY" }

// Get all states
const allStates = getAll(); // { name: "Bob", age: 25, city: "NY" }
```
With this modification, the functionality is flexible and can handle both all keys and a specific subset of them.

### 5. Key validation

If you try to access or update a state that does not exist, a descriptive error is thrown to avoid unexpected behavior:

```javascript
state("invalidKey"); // Throws an error: "The state with key \"invalidKey\" does not exist."
```

## API

### Initialization

```javascript
const { state, getAll } = useMultipleState(initialStates);
```

- **`initialStates`**: A key-value object where each key represents a state and its initial value.

### Methods

#### `state(key)`
- **`key`**: Name of the state you want to manage.
- Returns an object with the methods:
- **`get()`**: Returns the current value of the state.
- **`put(valueOrUpdater)`**: Updates the state with a value or a function that receives the previous value.

#### `getAll()`
- Returns an object with all the current states.

## Installation

### 1. Installation from npm

First, install the package from npm:

```bash
npm install usemultiplestate
```

### 2. Import and use

Import the hook into your project:

```javascript
const useMultipleState = require("useMultipleState");

function App() {
const { state, getAll } = useMultipleState({ quantity: 0, price: 0 });

const min = 0;

return (
 <div>
 <h1>Multiple State Management</h1>
 <p>Quantity: {state("quantity").get()}</p>
 <p>Price: {state("price").get()}</p>

 <button onClick={() => state("quantity").put((prev) => Math.max(min, prev + 1))}>
 Increase Quantity
 </button>

 <button onClick={() => state("price").put((prev) => Math.max(min, prev + 10))}>
 Increase Price by 10
 </button>

 <button onClick={() => console.log("All States:", getAll())}>
 Log All States
 </button>
 </div>
 );
}

module.exports = App;
```

## Benefits

- **Flexibility:** Support for values ​​and functions when updating state.
- **Scalability:** Makes it easier to manage multiple states without requiring multiple calls to `useState`.
- **Validation:** Prevents errors when trying to access undefined states.
- **Debugging:** Provides a centralized way to get all current states.

# Congratulations
Enjoy cleaner, more efficient handling of your states in React! 🎉