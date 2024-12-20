import { describe, expect, it } from 'vitest'
import useMultipleState from '../src/useMultipleState.js'
import { renderHook, act } from '@testing-library/react'

describe('Test UseMultipleState Hook', () => {

  describe('Fusionando el estado de objetos : Estado inicial = { key1: { a: 1, b: 2 }, key2: 42 , key3: true } ', () => {
    it('Cambiar "key1" por un objeto nuevo : state(\'key1\').put({ b: 3, c: 4 }) , expected : key1 = { key1: { a: 1, b: 3, c: 4 }, key2: 42 , key3: true} ', () => {
      const initialStates = { key1: { a: 1, b: 2 }, key2: 42, key3: true }
      const { result } = renderHook(() => useMultipleState(initialStates))
      act(() => {
        result.current.state('key1').put({ b: 3, c: 4 })
      })
      const updatedState = result.current.state('key1').get()
      const allData = result.current.getAll()
      expect(updatedState).toEqual({ a: 1, b: 3, c: 4 })
      expect(allData).toEqual({ key1: { a: 1, b: 3, c: 4 }, key2: 42, key3: true })
    })
    it('Cambiar "key1" por un nuevo valor  : state(\'key1\').put(\'newValue2\') , expected : state(\'key1\').get().toBe(\'newValue2\') ', () => {
      const initialStates = { key1: 'value1', key2: 42 }
      const { result } = renderHook(() => useMultipleState(initialStates))
      //const { state: testStates, getAll: testGetAll } = result.current

      /*act(() => {
        result.current.state('key1').put(
          'newValue1',
          (newValue) => {
            expect(newValue).toBe('newValue1')
          }
        )
      })*/

      act(() => {
        result.current.state('key1').put('newValue2')
      })
      const updatedState = result.current.state('key1').get()
      expect(updatedState).toBe('newValue2')

    })
    it('Cambiar "ALL"  por un nuevo objeto : state().put({ key1: \'newValue1\', key3: false }) , expected { key1: \'newValue1\', key2: 42, key3: false } ', () => {
      const initialStates = { key1: 'value1', key2: 42, key3: true }
      const { result } = renderHook(() => useMultipleState(initialStates))
      act(() => {
        result.current.state().put({ key1: 'newValue1', key3: false })
      })
      const updatedStates = result.current.getAll()
      expect(updatedStates).toEqual({ key1: 'newValue1', key2: 42, key3: false })
    })
    it('Generar "error" al cambiar "ALL" con un valor que no sea de objeto : state().put(\'invalidUpdate\') , expected :toThrowError(solo objetos) ', () => {
      const initialStates = { key1: 'value1', key2: 42 }
      const { result } = renderHook(() => useMultipleState(initialStates))
      expect(() => {
        act(() => {
          result.current.state().put('invalidUpdate')
        })
      }).toThrowError('Para actualizar todo el estado, debe proporcionarse un objeto o Clave de objeto para actualizar una especifica.')
    })
  })

  describe('Accediendo al estado de objetos : Estado inicial = { key1: { a: 1, b: 2 }, key2: 42 , key3: true } ', () => {

    it('Obteniendo "ALL" en el StateManager ', () => {
      const initialStates = { key1: 'value1', key2: 42 }
      const { result } = renderHook(() => useMultipleState(initialStates))
      const allData = result.current.getAll()
      expect(allData).toEqual(initialStates)
    })

    it('Obteniendo "key1, key2" con metodo "toBe", cuando el valor es un string o entero : expected : key1: toBe(\'value1\') , key2: toBe(42)', () => {
      const initialStates = { key1: 'value1', key2: 42, key3: true }
      const { result } = renderHook(() => useMultipleState(initialStates))
      expect(result.current.state('key1').get()).toBe('value1')
      expect(result.current.state('key2').get()).toBe(42)
    })

    it('Generar "error" al acceder a una clave inexistente: (key4 no exist)', () => {
      const initialStates = { key1: { a: 1, b: 2 }, key2: 42, key3: true }
      const { result } = renderHook(() => useMultipleState(initialStates))
      expect(() => {
        result.current.state('key4').get()
      }).toThrowError('El estado con clave "key4" no existe.')
    })

    it('Obteniendo estados específicos con getAll con metodo "toEqual" : getAll([\'key1\', \'key3\']) , expected : toEqual({ key1: { a: 1, b: 2 }, key3: true })', () => {
      const initialStates = { key1: { a: 1, b: 2 }, key2: 42, key3: true }
      const { result } = renderHook(() => useMultipleState(initialStates))
      const selectedStates = result.current.getAll(['key1', 'key3'])
      expect(selectedStates).toEqual({ key1: { a: 1, b: 2 }, key3: true })
    })

    it('Generar "error" si se llama a getAll con un argumento que no sea una matriz : getAll(\'key1\') , expected : toThrowError(debe ser array de claves)', () => {
      const initialStates = { key1: { a: 1, b: 2 }, key2: 42, key3: true }
      const { result } = renderHook(() => useMultipleState(initialStates))
      expect(() => {
        result.current.getAll('key1')
      }).toThrowError('La entrada a getAll debe ser un array de claves.')
    })

  })

})
