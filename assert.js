exports.that = function(condition, message) {
  message = message || "assert failed"
  if (!condition) {
    throw message
  }
}
