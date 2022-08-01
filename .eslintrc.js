module.export =  {
        root: true,
        parser:  '@typescript-eslint/parser',
        extends:  [ '@brightlayer-ui/eslint-config/tsx' ],
        parserOptions:  {
            project: "./tsconfig.json",
        },
        env: {
            browser: true
        },
        rules: {
        '@typescript-eslint/no-empty-function': 'off',
        "@typescript-eslint/no-unused-vars": "off",
        /*// eslint-disable-next-line @typescript-eslint/no-unused-vars*/
        'no-empty-function': 'off',
        'react/jsx-key': 'off',
        'no-console': 'off',
        // '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: [
                    'classProperty',
                    'objectLiteralProperty',
                    'typeProperty',
                    'classMethod',
                    'objectLiteralMethod',
                    'typeMethod',
                    'accessor',
                    'enumMember',
                ],
                format: null,
                modifiers: ['requiresQuotes'],
            },
        ],
    },
    };