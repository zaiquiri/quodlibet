exports.that = function(condition, message) {
  typeof(message) === 'undefined' ? "assert failed" : message
  if (!condition) {
    throw message
  }
}
