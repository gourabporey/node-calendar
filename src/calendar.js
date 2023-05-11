const { chunk } = require("../lib/array-utils.js");
const { spaces, centerAlign } = require("../lib/string-utils.js");

const getNoOfDays = function (monthIndex, year) {
  return new Date(year, monthIndex + 1).getUTCDate();
}

const getStartingDay = function (monthIndex, year) {
  return new Date(year, monthIndex, 1).getDay();
}

const getYearlyCalendar = function (year = 2023) {
  const months = [];

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    months.push(getMonthlyCalendar(monthIndex, year));
  }

  return months;
}

const getMonthlyCalendar = function (monthIndex, year = 2023) {
  const daysInMonth = getNoOfDays(monthIndex, year);
  const startingDay = getStartingDay(monthIndex, year);

  let date = 1;
  const month = Array.from({ length: 35 }, function (_, i) {
    return (i < startingDay || i > startingDay + daysInMonth) ? spaces(2) : date++;
  })

  return month;
}

const renderWeek = function (week) {
  return week.map(function (day) {
    return centerAlign(day, 3);
  }).join(" ");
}

function toString(monthlyCalendar, monthIndex, year = 2023) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const month = months[monthIndex];
  const heading = centerAlign(month + ' ' + year, 20);
  const label = [[heading], days];
  const weeks = [...label, ...chunk(monthlyCalendar, 7)];

  return weeks.map(renderWeek).join("\n");
}

const toNumbers = function (numberTexts) {
  return numberTexts.map(function (n) { return +n; })
}

exports.getMonthlyCalendar = getMonthlyCalendar;
exports.toString = toString;
exports.toNumbers = toNumbers;