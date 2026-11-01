import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'build',
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [{name: 'katex', test: /node_modules[\\/]katex[\\/]/}],
                },
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['src/tests/**/*.test.{ts,tsx}'],
        setupFiles: ['src/tests/setup.ts'],
    },
});
