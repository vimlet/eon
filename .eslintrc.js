module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": "eslint:recommended",
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
        "padded-blocks": [
            "error",
            "never"
        ],
        curly: "error",
        // "padding-line-between-statements": [
        //     "error",
        //     { "blankLine": "never", "prev": "*", "next": "*" }
        // ],
        "no-console": 0
    }
};