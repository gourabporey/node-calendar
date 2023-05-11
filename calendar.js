class Calendar {
  isLeapYear(year) {
    const isDivisibleBy400 = year % 400 === 0;
    const isDivisibleBy100 = year % 100 === 0;
    const isDivisibleBy4 = year % 4 === 0;

    return (isDivisibleBy100 + isDivisibleBy400 + isDivisibleBy4) % 2 === 1;
  }

  year() {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  week(firstDate, lastDate) {
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let date = firstDate;

    return days.reduce(function (week, day) {
      if (date === lastDate) return week;
      return { ...week, [day]: date++ };
    }, {});
  };

  month(day, noOfDays) {

  }
}

const calcFirstDayOfTheWeek = function () {
  const today = new Date();
  const day = today.getDay(); // 4 Day index 1 based indexing
  const date = today.getDate(); // 11
  return (date - day);
};

const sum = function (numbers) {
  return numbers.reduce(function (sum, num) {
    return sum + num;
  }, 0)
}

const calculateDaysPassed = function (months, currentMonthIndex, currentDate) {
  return sum(months.slice(0, currentMonthIndex)) + currentDate - 1;
}

const calculateDay = function (days) {
  const today = new Date();
  return today.getDay() - days % 7;
}

exports.Calendar = Calendar;
exports.calculateDay = calculateDay;
exports.calculateDaysPassed = calculateDaysPassed;