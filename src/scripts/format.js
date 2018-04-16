var glob = require("glob");
var fs = require("fs-extra");
var Linter = require("eslint").Linter;

var linter = new Linter();

var eslintrc = {
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
    "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "block-like" }
    ],
    "no-console": 0
  }
};

glob("src/scripts/format/**/*", null, function (error, files) {

  files.forEach(function (file) {

    var data = fs.readFileSync(file).toString();
    var verifyAndFixObject = linter.verifyAndFix(data, eslintrc);

    console.log(verifyAndFixObject.output);

  })

});