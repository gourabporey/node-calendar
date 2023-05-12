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

  getMonthlyCalendar(monthIndex, year = 2023) {
    const daysInMonth = new Date(year, monthIndex + 1).getUTCDate();
    const startingDay = new Date(year, monthIndex, 1).getDay();

    return Array.from({ length: 35 }, function (_, i) {
      const date = i - startingDay + 1;
      return (date < 1 || date > daysInMonth) ? spaces(2) : date;
    });
  }

  #renderWeek(week) {
    return week.map((day) => { return centerAlign(day, 2); }).join(" ");
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

  #getHeadline([a, b, c]) {
    return centerAlign(a, 20) + centerAlign(b, 28) + centerAlign(c, 20);
  }

  #generateRowOfQuarters(weeks, i) {
    return [...weeks[i], "  ", ...weeks[i + 5], "  ", ...weeks[i + 10]];
  }

  #generateQuarterlyDayLabels() {
    return new Array(5).fill().flatMap((_, i) => {
      return i % 2 === 0 ? this.#days : " ";
    });
  }

  #quarterToString(quarter, quarterIndex) {
    const firstMonthIndex = quarterIndex * 3;
    const months = this.#months.slice(firstMonthIndex, firstMonthIndex + 3);
    const weeks = quarter.flatMap((month) => { return chunk(month, 7); });

    const heading = this.#getHeadline(months);
    const labels = this.#generateQuarterlyDayLabels();
    const rows = [[heading], labels];

    for (let i = 0; i < 5; i++) {
      rows.push(this.#generateRowOfQuarters(weeks, i));
    }

    return rows.map(this.#renderWeek).join("\n");
  }

  yearToString(yearlyCalendar, year) {
    const quarterlyCalendar = chunk(yearlyCalendar, 3);

    return quarterlyCalendar.reduce((previousQuarterText, quarter, quarterIndex) => {
      return `${previousQuarterText}${this.#quarterToString(quarter, quarterIndex)}\n\n`;
    }, "");
  }
}

const c = new Calendar();
console.log(c.yearToString(c.getYearlyCalendar(2023), 2023));
exports.Calendar = Calendar;