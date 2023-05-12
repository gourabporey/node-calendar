const { chunk } = require("../lib/array-utils.js");
const { spaces, centerAlign } = require("../lib/string-utils.js");

class Calendar {
  #months;
  #days;

  constructor() {
    this.#months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    this.#days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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
      return centerAlign(day, 2);
    }).join(" ");
  }

  monthToString(monthlyCalendar, monthIndex, year = 2023) {
    const month = this.#months[monthIndex];
    const heading = centerAlign(`${month} ${year}`, 20);
    const label = [[heading], this.#days];
    const weeks = [...label, ...chunk(monthlyCalendar, 7)];

    return weeks.map(this.#renderWeek).join("\n");
  }

  getYearlyCalendar(year = 2023) {
    const cal = this;
    return Array.from({ length: 12 }, function (_, monthIndex) {
      return cal.getMonthlyCalendar(monthIndex, year);
    });
  }

  #quarterToString(quarter, quarterIndex) {
    const first = this.#months[quarterIndex];
    const second = this.#months[quarterIndex + 1];
    const third = this.#months[quarterIndex + 2];

    const heading = centerAlign(first, 20) + centerAlign(second, 28) + centerAlign(third, 20);

    const weeklyCalendars = quarter.flatMap(function (month) {
      return chunk(month, 7);
    });

    const rows = [[heading]];
    for (let i = 0; i < 5; i++) {
      rows.push([...weeklyCalendars[i], "  ", ...weeklyCalendars[i + 5], "  ", ...weeklyCalendars[i + 10]]);
    }

    return rows.map(this.#renderWeek).join("\n");
  }

  yearToString(yearlyCalendar, year) {
    const quarterlyCalendar = chunk(yearlyCalendar, 3);

    const cal = this;
    return quarterlyCalendar.reduce(function (eachQuarterText, quarter, quarterIndex) {
      return `${eachQuarterText}${cal.#quarterToString(quarter, quarterIndex)}\n`;
    }, "");
  }
}

exports.Calendar = Calendar;