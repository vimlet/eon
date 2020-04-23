eon.time = eon.time || {};

  eon.time.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  eon.time.getDaysInMonth = function (year, month) {
    return [31, eon.time.isLeapYear(parseInt(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][parseInt(month)];
  };

  eon.time.getMonthNames = function (locale, format) {
    var monthNames = [];
    format = format ? format : "long";
    for (var i = 0; i <= 11; i++) {
      monthNames.push(eon.time.getMonthName(locale, i, format));
    }
    return monthNames;
  };

  eon.time.getMonthName = function (locale, month, format) {
    var dummyDate = new Date(2000, parseInt(month), 15);
    format = format ? format : "long";
    return dummyDate.toLocaleString(locale, { month: format });
  };

  eon.time.getWeekDays = function (locale, format) {
    var dayNames = [];
    var dummyDate;
    format = format ? format : "long";
    for (var i = 1; i <= 7; i++) {
      dummyDate = new Date(2000, 4, parseInt(i));
      dayNames.push(dummyDate.toLocaleString(locale, { weekday: format }));
    }
    return dayNames;
  };

  eon.time.getWeekDay = function (year, month, day) {
    year = typeof year == "string" ? parseInt(year.replace(/[^\x00-\x7F]/g, "")) : year;
    month = typeof month == "string" ? parseInt(month.replace(/[^\x00-\x7F]/g, "")) : month;
    day = typeof day == "string" ? parseInt(day.replace(/[^\x00-\x7F]/g, "")) : day;
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, month, day).getDay()];
  };

  eon.time.getFirstWeekDay = function (locale, year, month, format) {
    var dummyDate;
    year = typeof year == "string" ? parseInt(year.replace(/[^\x00-\x7F]/g, "")) : year;
    month = typeof month == "string" ? parseInt(month.replace(/[^\x00-\x7F]/g, "")) : month;
    dummyDate= new Date(year, month, 1);
    format = format ? format : "long";
    return dummyDate.toLocaleString(locale, {
      weekday: format
    });
  };

  eon.time.getFirstWeekMonday = function (locale, year, month, format) {
    var monDay, monthDays;
    var firstWeekDay, weekPosition;

    year = typeof year == "string" ? parseInt(year.replace(/[^\x00-\x7F]/g, "")) : year;
    month = typeof month == "string" ? parseInt(month.replace(/[^\x00-\x7F]/g, "")) : month;

    firstWeekDay = eon.time.getFirstWeekDay(locale, year, month, format);
    weekPosition = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].indexOf(firstWeekDay);

    // Check first month reached
    if (month === 0) {
      month = 11;
      year--;
    } else {
      month--;
    }
    // Get previous month days
    monthDays = eon.time.getDaysInMonth(year, month);
    monDay = (monthDays + 1) - weekPosition;
    return monDay;
  };

  eon.time.getDateWithFormat = function (date, format, locale) {

    if (date) {

      var dayFormat = format.match(/[d|D]{1,2}/) ? format.match(/[d|D]{1,2}/)[0] : null;
      var monthFormat = format.match(/[M]{1,4}/) ? format.match(/[M]{1,4}/)[0] : null;
      var yearFormat = format.match(/[y|Y]{2,4}/) ? format.match(/[y|Y]{2,4}/)[0] : null;
      var hoursFormat = (format.match(/[h]{1,2}/)) ? format.match(/[h]{1,2}/)[0] : null;
      var minutesFormat = (format.match(/[m]{1,2}/)) ? format.match(/[m]{1,2}/)[0] : null;
      var dayType, monthType, yearType, dayString, monthString, yearString;

      if (yearFormat) {
        yearType = yearFormat.length > 1 ? "numeric" : "2-digit";
        yearString = formatedMonth = date.toLocaleString([locale], { year: yearType });
        format = format.replace(yearFormat, yearString);
      }

      if (dayFormat) {
        dayType = dayFormat.length > 1 ? "2-digit" : "numeric";
        dayString = formatedMonth = date.toLocaleString([locale], { day: dayType });
        format = format.replace(dayFormat, dayString);
      }

      if (monthFormat) {
        switch (monthFormat.length) {
          case 1:
            monthType = "numeric";
            break;
          case 3:
            monthType = "short";
            break;
          case 4:
            monthType = "long";
            break;
          default:
            monthType = "2-digit";
        }
        monthString = formatedMonth = date.toLocaleString([locale], {
          month: monthType
        });
        format = format.replace(monthFormat, monthString);
      }

      if (hoursFormat) {
        format.replace(hoursFormat, date.getHours());
      }

      if (minutesFormat) {
        format.replace(minutesFormat, date.getMinutes());
      }

      return format;

    }

    return null;

  };

  eon.time.getFormatSeparator = function (format) {

    var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
    var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
    var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

    format = format.replace(dayFormat, "");
    format = format.replace(monthFormat, "");
    format = format.replace(yearFormat, "");

    return format[0];

  };

  eon.time.getDateValueObjectFromString = function (value, format) {

    var separator = eon.time.getFormatSeparator(format);
    
    var minutesFormat = (format.match(/[m]{1,2}/)) ? format.match(/[m]{1,2}/)[0] : null;
    var hoursFormat = (format.match(/[h]{1,2}/)) ? format.match(/[h]{1,2}/)[0] : null;
    var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : null;
    var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : null;
    var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : null;
    var valueObj = {};

    if (value.indexOf(":") > -1) {
      var timeValue = value.indexOf(" ") > -1 ? value.split(" ")[1] : value;
      valueObj.hours = timeValue.split(":")[0];
      valueObj.minutes = timeValue.split(":")[1];
    }

    if (value.indexOf(separator) > -1) {
      var dateValue = value.indexOf(" ") > -1 ? value.split(" ")[0].split(separator) : value.split(separator);
      var splittedDateFormat = minutesFormat && hoursFormat ? format.split(" ")[0].split(separator) : format.split(separator);
      var dayIndex = splittedDateFormat.indexOf(dayFormat);
      var monthIndex = splittedDateFormat.indexOf(monthFormat);
      var yearIndex = splittedDateFormat.indexOf(yearFormat);
      valueObj.day = dateValue[dayIndex] != "Invalid Date" ? dateValue[dayIndex] : null;
      valueObj.month = dateValue[monthIndex] != "Invalid Date" ? dateValue[monthIndex] : null;
      valueObj.year = dateValue[yearIndex] != "Invalid Date" ? dateValue[yearIndex] : null;
    }
    
    return valueObj;

  };

  eon.time.getDateValueObjectFromDate = function (date, includeTime) {
    
    var valueObj = {
      day: date.toLocaleString([], { day: "numeric" }),
      month: date.toLocaleString([], { month: "numeric" }),
      year: date.toLocaleString([], { year: "numeric" }),
      hours: date.getHours(),
      minutes: date.getMinutes()
    }

    valueObj.day = typeof valueObj.day == "string" ? parseInt(valueObj.day.replace(/[^\x00-\x7F]/g, "")) : valueObj.day;
    valueObj.year = typeof valueObj.year == "string" ? parseInt(valueObj.year.replace(/[^\x00-\x7F]/g, "")) : valueObj.year;
    valueObj.month = typeof valueObj.month == "string" ? parseInt(valueObj.month.replace(/[^\x00-\x7F]/g, "")) : valueObj.month;

    return valueObj;

  };

  eon.time.generateOutput = function (dateObj, format) {

    var minutesFormat = (format.match(/[m]{1,2}/)) ? format.match(/[m]{1,2}/)[0] : undefined;
    var hoursFormat = (format.match(/[h]{1,2}/)) ? format.match(/[h]{1,2}/)[0] : undefined;
    var dayFormat = (format.match(/[d|D]{1,2}/)) ? format.match(/[d|D]{1,2}/)[0] : undefined;
    var monthFormat = (format.match(/[M]{1,4}/)) ? format.match(/[M]{1,4}/)[0] : undefined;
    var yearFormat = (format.match(/[y|Y]{2,4}/)) ? format.match(/[y|Y]{2,4}/)[0] : undefined;

    var formatFn = function (text, format) {

      text = text ? text + "" : "";

      if (text.length > 0 && text.length < format.length) {
        for (var i = 0; i < (format.length - text.length); i++) {
          text = "0" + text;
        }
      }

      return text;

    };

    if (dateObj.minutes != null && minutesFormat) {
      var minutes = formatFn(dateObj.minutes, minutesFormat);
      format = format.replace(minutesFormat, minutes);
    }

    if (dateObj.hours != null && hoursFormat) {
      var hours = formatFn(dateObj.hours, hoursFormat);
      format = format.replace(hoursFormat, hours);
    }

    if (dateObj.day != null && dayFormat) {
      var day = formatFn(dateObj.day, dayFormat);
      format = format.replace(dayFormat, day);
    }

    if (dateObj.month != null && monthFormat) {
      var month = formatFn(dateObj.month, monthFormat);
      format = format.replace(monthFormat, month);
    }

    if (dateObj.year != null && yearFormat) {
      var year = formatFn(dateObj.year, yearFormat);
      format = format.replace(yearFormat, year);
    }

    return format;

  };

  eon.time.defaultLocale = {

    months: {

      long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    },

    weekdays: {

      long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      min: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

    }

  };