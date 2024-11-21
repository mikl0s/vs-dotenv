import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['packages/extension/src/test/**/*.test.ts'],
        exclude: ['**/node_modules/**', '**/.vscode-test/**'],
        setupFiles: ['packages/extension/src/test/setup.ts'],
        // Enable parallel test execution
        pool: 'threads',
        poolOptions: {
            threads: {
                singleThread: false,
                isolate: true
            }
        },
        // Run test files in parallel
        fileParallelism: true
    },
    resolve: {
        alias: {
            'vscode': resolve(__dirname, 'packages/extension/src/test/__mocks__/vscode.ts')
        },
        extensions: ['.ts', '.js', '.mjs', '.json', '.node'],
        mainFields: ['module', 'main']
    },
    esbuild: {
        target: 'node18',
        format: 'esm',
        platform: 'node'
    }
});
