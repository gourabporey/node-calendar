const { chunk } = require("../lib/array-utils.js");
const { spaces, centerAlign } = require("../lib/string-utils.js");

class Calendar {
  #months;
  #days;

  constructor(months, days) {
    this.#months = [...months];
    this.#days = [...days];
  }

  #getDaysInMonth(monthIndex, year = 2023) {
    return new Date(year, monthIndex + 1).getUTCDate();
  }

  #getStartingDay(monthIndex, year = 2023) {
    return new Date(year, monthIndex, 1).getDay();
  }

  getMonthlyCalendar(monthIndex, year = 2023) {
    const daysInMonth = this.#getDaysInMonth(monthIndex, year);
    const startingDay = this.#getStartingDay(monthIndex, year);

    return Array.from({ length: 35 }, function (_, i) {
      const date = i - startingDay + 1;
      return (date < 1 || date > daysInMonth) ? spaces(2) : date;
    });
  }

  #renderWeek(week) {
    return week.map(function (day) {
      return centerAlign(day, 3);
    }).join(" ");
  }

  toString(monthlyCalendar, monthIndex, year = 2023) {
    const month = this.#months[monthIndex];
    const heading = centerAlign(month + ' ' + year, this.#days.length * 3);
    const label = [[heading], this.#days];
    const weeks = [...label, ...chunk(monthlyCalendar, this.#days.length)];

    return weeks.map(this.#renderWeek).join("\n");
  }

  getYearlyCalendar(year = 2023) {
    const cal = this;
    return Array.from({ length: 12 }, function (_, monthIndex) {
      return cal.getMonthlyCalendar(monthIndex, year);
    });
  }

  yearToString(yearlyCalendar, year) {
    return yearlyCalendar.reduce(function (yearlyCalendarText, monthlyCalendar, monthIndex) {
      return yearlyCalendarText.concat(this.toString(monthlyCalendar, monthIndex, year));
    }, "");
  }
}

exports.Calendar = Calendar;