const { getMonthlyCalendar, toString, toNumbers } = require("./src/calendar.js");

const main = function (args) {
  const [month, year] = toNumbers(args);
  const monthIndex = month - 1;

  const monthlyCalendar = getMonthlyCalendar(monthIndex, year);

  console.log(toString(monthlyCalendar, monthIndex, year));
}

main(process.argv.slice(2));