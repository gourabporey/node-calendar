const { chunk } = require("./array-utils.js");

const spaces = function (count) {
  return " ".repeat(count);
}

const centerAlign = function (text, width) {
  const length = text.toString().length;
  return text.toString().padStart((width + length) / 2, spaces(1));
}

const getMonthlyCalendar = function (startingDay, noOfDays) {
  const month = new Array(42).fill(spaces(2));

  let date = 1;
  for (let i = startingDay; i < startingDay + noOfDays; i++) {
    month[i] = centerAlign(date, 3);
    date++;
  }

  return month;
}

const toString = function (monthlyCalendar, monthIndex, year) {
  const months = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September",
    "October", "November", "December",
  ];

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const month = months[monthIndex];

  const heading = [centerAlign(month + ' ' + year, 20)];
  const label = [heading, days];
  const weeks = label.concat(chunk(monthlyCalendar, 7));

  return weeks.map(function (chunk) {
    return chunk.join(" ");
  }).join("\n");
}

const msToDay = function (ms) {
  const msInADay = (1000 * 60 * 60 * 24);
  return Math.floor(ms / msInADay);
}

const getMonthDetails = function (monthIndex, year) {
  const month = new Date(year, monthIndex, 1);
  const nextMonth = new Date(year, monthIndex + 1, 1);
  const days = msToDay(Date.parse(nextMonth) - Date.parse(month));

  return [days, month.getDay()];
}

const toNumbers = function (numberTexts) {
  return numberTexts.map(function (n) { return +n; })
}

exports.msToDay = msToDay;
exports.getMonthDetails = getMonthDetails;
exports.getMonthlyCalendar = getMonthlyCalendar;
exports.toString = toString;
exports.toNumbers = toNumbers;