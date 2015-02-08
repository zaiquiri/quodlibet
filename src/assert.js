exports.that = function(condition, message) {
  message = message || "assert failed";
  if (!condition) {
    throw message + new Error().stack.match(/^.*\n.*\n(.*)/)[1];
  }
};
