const getMonth = function (day, noOfDays) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const month = new Array(42).fill("  ");

  for (let i = day, j = 1; i < day + noOfDays; i++) {
    month[i] = j++;
  }

  return month;
}

const toString = function (month) {
  const chunks = chunk(month, 7);
  return chunks.map(function (chunk) {
    return chunk.join(" ");
  }).join("\n");
}

const calcFirstDayOfTheWeek = function () {
  const today = new Date();
  const day = today.getDay();
  const date = today.getDate();
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

const makeChunk = function (chunks, element, size) {
  const newChunks = chunks.slice(0);
  const lastChunkIndex = newChunks.length - 1;
  const lastChunk = newChunks[lastChunkIndex];

  if (lastChunk.length < size) {
    lastChunk.push(element);
  } else {
    newChunks.push([element]);
  }

  return newChunks;
}

const chunk = function (list, size) {
  return list.reduce(function (chunks, element) {
    return makeChunk(chunks, element, size);
  }, [[]]);
}

exports.calculateDay = calculateDay;
exports.calculateDaysPassed = calculateDaysPassed;