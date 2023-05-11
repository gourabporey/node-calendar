const { describe, it } = require('node:test');
const { strictEqual, ok, deepStrictEqual } = require('assert');
const { calculateDay, calculateDaysPassed } = require('./calendar.js');

describe("CalculateDaysPassed()", function () {
  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  it("Should give zero if the current day is 1st jan", function () {
    strictEqual(calculateDaysPassed(months, 0, 1), 0)
  });

  it("Should give 9 for 10 days", function () {
    strictEqual(calculateDaysPassed(months, 0, 10), 9)
  });

  it("Should give the no of days passed from the start of the year", function () {
    strictEqual(calculateDaysPassed(months, 4, 11), 130)
  });
})

describe("calculateDay()", function () {
  it("Should give the date back if zero is provided", function () {
    strictEqual(calculateDay(0), 4);
  });

  it("Should give the date back if multiple of 7 is provided", function () {
    strictEqual(calculateDay(7), 4);
  });

  it("Should give the date back if any day is provided", function () {
    strictEqual(calculateDay(10), 1);
  });

  it("Should give back if zero is provided", function () {
    strictEqual(calculateDay(130), 0);
  });

  it("Should give the day two day after today", function () {
    strictEqual(calculateDay(16), 2);
  });
});