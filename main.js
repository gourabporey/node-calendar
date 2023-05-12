const { Calendar } = require("./src/calendar.js");
const { toNumbers } = require("./lib/array-utils.js")

const main = function (args) {
  const [month, year] = toNumbers(args);
  const monthIndex = month - 1;

  const calendar = new Calendar();
  const monthlyCalendar = calendar.getMonthlyCalendar(monthIndex, year);

  console.log(calendar.monthToString(monthlyCalendar, monthIndex, year));
}

main(process.argv.slice(2));