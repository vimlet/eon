exports.instantiate = function () {

  var instance = {};
  instance.combined = {};
  instance.result = {};

  // Multiple index to avoid iteration
  var flagShort = {};
  var flagLong = {};
  var valueShort = {};
  var valueLong = {};

  //@function flag (public) [Store flag] @param short [Shortcut] @param long [Command name] @param description [Command description]
  instance.flag = function (short, long, description) {

    if (short && short != "") {
      flagShort[short] = {
        short: short,
        long: long,
        description: description
      }
    }

    flagLong[long] = {
      short: short,
      long: long,
      description: description
    }

    instance.combined[long] = {
      short: short,
      long: long,
      description: description
    }

    return instance;

  };

  //@function value (public) [Store value] @param short [Shortcut] @param long [Command name] @param description [Command description] @param handler
  instance.value = function (short, long, description, handler) {

    if (short && short != "") {
      valueShort[short] = {
        short: short,
        long: long,
        description: description,
        handler: handler
      }
    }

    valueLong[long] = {
      short: short,
      long: long,
      description: description,
      handler: handler
    }

    instance.combined[long] = {
      short: short,
      long: long,
      description: description
    }

    return instance;

  };

 // @function sanitize (private) [Remove extra ' in string. Issue affecting windows OS only]
  function sanitize(element) {
    if (element.match(new RegExp("^'[\\s\\S]*'$", "g"))) {
      return element.substring(1, element.length - 1);
    } else if (element.match(new RegExp('^"[\\s\\S]*"$', "g"))) {
      return element.substring(1, element.length - 1);
    } {
      return element;
    }
  }

  instance.parse = function (args) {

    var argsArray = Array.isArray(args) ? args : spaceSplit(args);
    
    var sanitizedArgs = [];
    argsArray.forEach(function (element) {
      sanitizedArgs.push(sanitize(element));
    });    

    var values = {};
    var key;

    sanitizedArgs.forEach(function (element, index) {
      if (element[0] === "'" && element[element.length - 1] === "'") {
        element = element.substring(1, element.length - 1);
      } else if (element[0] === '"' && element[element.length - 1] === '"') {
        element = element.substring(1, element.length - 1);
      }

      // Match short flag
      if (flagShort[element]) {
        key = flagShort[element].long.replace(/^-+/g, "");
        values[key] = true;

      }

      // Match long flag
      if (flagLong[element]) {
        key = element.replace(/^-+/g, "");
        values[key] = true;
      }

      // Match short value
      if (valueShort[element]) {
        key = valueShort[element].long.replace(/^-+/g, "");
        if ((index + 1) < sanitizedArgs.length) {
          if (valueShort[element].handler) {
            values[key] = valueShort[element].handler(sanitizedArgs[index + 1]);
          } else {
            values[key] = sanitizedArgs[index + 1];
          }
        }
      }

      // Match long value
      if (valueLong[element]) {
        key = element.replace(/^-+/g, "");
        if ((index + 1) < sanitizedArgs.length) {
          if (valueLong[element].handler) {
            values[key] = valueLong[element].handler(sanitizedArgs[index + 1]);
          } else {
            values[key] = sanitizedArgs[index + 1];
          }
        }
      }

    });

    instance.result = values;
    return values;
  };

  //@function printHelp (public) [Print help to console]
  instance.printHelp = function () {
    var combinedShortKeys = Object.keys(instance.combined).sort();
    var element;

    var tabSize = 8;
    var firstPadding;
    var secondPadding;

    var shortHeader = "SHORT:" + " ".repeat((2 * tabSize) - "SHORT:".length);
    var longHeader = "LONG:" + " ".repeat((3 * tabSize) - "LONG:".length);
    var descriptionHeader = "DESCRIPTION:"

    console.log(`\n${shortHeader}${longHeader}${descriptionHeader}\n`);
    combinedShortKeys.forEach(function (key) {
      element = instance.combined[key];
      var elShort = element.short ? element.short : "";
      firstPadding = " ".repeat((2 * tabSize) - elShort.length);
      secondPadding = " ".repeat((3 * tabSize) - element.long.length);
      console.log(`${elShort}${firstPadding}${element.long}${secondPadding}${element.description}`);
    });
    console.log("");
  };

  //@function isReserved (private) [Check whether an argument is a reservated tag]
  function isReserved(value) {
    return value in flagShort || value in flagLong || value in valueShort || value in valueLong;
  }

  //@function spaceSplit (private) [Split args into an array by spaces]
  function spaceSplit(s) {
    var split = s.split(/("[^"]*"|'[^']*'|[\S]+)+/g);
    var result = [];
    split.forEach(function (value) {
      if (value.trim() != "") {
        result.push(value);
      }
    });
    return result;
  }

  return instance;

};