module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "node": true,
        "es6": false
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "curly": "error",
        "no-multiple-empty-lines": [
            "warn", {
                "max": 1
            }
        ],
        "padded-blocks": [
            "error",
            "never"
        ],
        "padding-line-between-statements": [
            "error",
            { "blankLine": "never", "prev": "*", "next": "*" },
            { "blankLine": "always", "prev": "*", "next": "block-like" },
            { "blankLine": "always", "prev": "*", "next": "multiline-expression" }
        ],
        "no-console": 0
    }
};