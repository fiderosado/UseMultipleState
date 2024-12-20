import { expect } from 'vitest' // Importa el expect de Vitest
import * as matchers from '@testing-library/jest-dom/matchers'

// Extiende expect con los matchers de jest-dom
expect.extend(matchers)
