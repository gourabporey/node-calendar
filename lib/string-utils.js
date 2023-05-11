const spaces = function (count) {
  return " ".repeat(count);
}

const centerAlign = function (text, width) {
  const length = text.toString().length;
  return text.toString().padStart((width + length) / 2, spaces(1));
}

exports.centerAlign = centerAlign;
exports.spaces = spaces;