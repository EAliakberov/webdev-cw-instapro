import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import { config } from 'eslint-config-prettier';
import { plugin } from 'eslint-plugin-prettier';

export default defineConfig([
    js.configs.recommended,
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    {
        ignores: ['node_modules/', 'dist/', '*.config.js', '.vscode/', '.git/'],
    },
    eslintPluginPrettierRecommended,
    {
        rules: {
            'prettier/prettier': [
                'error',
                {
                    tabWidth: 4,
                    semi: true,
                    singleQuote: false,
                },
            ],
        },
    },
    plugin,
    config,
]);
