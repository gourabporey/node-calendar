const { getMonthDetails, getMonthlyCalendar, toString, toNumbers } = require("./calendar.js");

const main = function (args) {
  const [month, year] = toNumbers(args);
  const monthIndex = month - 1;
  const [noOfDays, startDay] = getMonthDetails(monthIndex, year);
  const monthlyCalendar = getMonthlyCalendar(startDay, noOfDays);

  console.log(toString(monthlyCalendar, monthIndex, year));
}

main(process.argv.slice(2));