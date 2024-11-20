import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
    {
        files: ['packages/extension/src/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module'
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            'curly': ['warn'],
            'eqeqeq': ['warn'],
            'no-throw-literal': ['warn']
        },
        ignores: ['out/**', 'dist/**', '**/*.d.ts']
    }
];
