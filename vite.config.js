import {defineConfig} from 'vite';

export default defineConfig({
    test: {
        environment: 'jsdom', // Configura jsdom como entorno
        setupFiles: './vitest.setup.js', // Archivo de configuración adicional
    },
});
