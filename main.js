const { Calendar } = require("./src/calendar.js");
const { toNumbers } = require("./lib/array-utils.js")

const main = function (args) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const [month, year] = toNumbers(args);
  const monthIndex = month - 1;

  const calendar = new Calendar(months, days);
  const monthlyCalendar = calendar.getMonthlyCalendar(monthIndex, year);

  console.log(calendar.toString(monthlyCalendar, monthIndex, year));
}

main(process.argv.slice(2));