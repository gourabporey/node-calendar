const { Calendar } = require("./src/calendar.js");
const { toNumbers } = require("./lib/array-utils.js")

const main = function (args) {
  const [month, year] = toNumbers(args);
  const monthIndex = month - 1;

  const calendar = new Calendar(monthIndex, year);
  const monthlyCalendar = calendar.getMonthlyCalendar();

  console.log(calendar.toString(monthlyCalendar));
}

main(process.argv.slice(2));