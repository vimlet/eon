module.exports = {
  clean: true,
  output: {
    "build/**": {
      order: 0,
      use: async function (entry) {
        entry.path = entry.path.replace(".vmt", "");
        return entry;
      },
      input: [{
        "src/meta/**.vmt": {
          parse: true
        }
      },
        "src/copy/**"
      ]
    },
    "tests/webapp/**": {
      order: 1,
      input: [
        "build/**",
        "src/tests/**"
      ]
    }
  }
};