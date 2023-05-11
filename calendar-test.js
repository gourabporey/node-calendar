const { describe, it } = require('node:test');
const { strictEqual, ok, deepStrictEqual } = require('assert');

const { msToDay } = require("./calendar.js");

describe("Milliseconds to day", function () {
  it("Should give zero day for 0", function () {
    strictEqual(msToDay(0), 0);
  });

  it("Should give 1 day for value equal to 8.64e+7 ms", function () {
    strictEqual(msToDay(8.64e+7), 1);
  });
})
