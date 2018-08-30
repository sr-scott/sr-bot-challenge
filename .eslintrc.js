module.exports = {
    extends: ["airbnb-base", "plugin:jest/recommended"],
    plugins: ["jest"],
    rules: {
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'default-case': 'off',
        'no-lone-blocks': 'off'
    },
    overrides: [
        {
            files: ['*.spec.js', '*.test.js'],
            env: {
                jest: true
            },
        }
    ]
};
