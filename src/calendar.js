const { chunk } = require("../lib/array-utils.js");
const { spaces, centerAlign } = require("../lib/string-utils.js");

class Calendar {
  #monthIndex;
  #year;

  constructor(monthIndex, year = 2023) {
    this.#monthIndex = monthIndex;
    this.#year = year;
  }

  get #daysInMonth() {
    return new Date(this.#year, this.#monthIndex + 1).getUTCDate();
  }

  get #startingDay() {
    return new Date(this.#year, this.#monthIndex, 1).getDay();
  }

  getMonthlyCalendar() {
    const daysInMonth = this.#noOfDays;
    const startingDay = this.#startingDay;

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

  toString(monthlyCalendar) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const month = months[this.#monthIndex];
    const heading = centerAlign(month + ' ' + this.#year, 20);
    const label = [[heading], days];
    const weeks = [...label, ...chunk(monthlyCalendar, 7)];

    return weeks.map(this.#renderWeek).join("\n");
  }

  getYearlyCalendar(year = 2023) {
    return Array.from({ length: 12 }, function (_, i) {
      return this.getMonthlyCalendar(i, year);
    });
  }

  yearToString(yearlyCalendar, year) {
    return yearlyCalendar.reduce(function (yearlyCalendarText, monthlyCalendar, monthIndex) {
      return yearlyCalendarText.concat(this.toString(monthlyCalendar, monthIndex, year));
    }, "");
  }
}

exports.Calendar = Calendar;