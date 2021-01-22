(function (proxied) {
  Date.prototype.toLocaleString = function (locale, options) {

    if (options.month && (options.month == "long" || options.month == "short") && Object.keys(options).length == 1) {
      return eon.time.defaultLocale.months[options.month][this.getMonth()];
    } else if (options.weekday && (options.weekday == "long" || options.weekday == "short" || options.weekday == "min") && Object.keys(options).length == 1) {
      return eon.time.defaultLocale.weekdays[options.weekday][this.getDay()];
    }

    return proxied.apply(this, arguments);
  };
})(Date.prototype.toLocaleString);