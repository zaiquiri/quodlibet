exports.that = function(condition) {
  if (!condition) {
    throw "assert failed"
  }
}
