module.exports = TextStream;

function TextStream(text, start){
  this.input = text;
  this.position = start || 0;
}

TextStream.prototype.peek = function() {
  return this.input.charAt(this.position);
};

TextStream.prototype.eof = function() {
  return this.position >= this.input.length;
};

TextStream.prototype.pop = function() {
  if (this.eof()){
    throw new RangeError("Nothing more to pop!");
  } else{
    return this.input.charAt(this.position++);
  }
};

TextStream.prototype.popWhile = function(condition) {
  var result = "";
  while (!this.eof() && condition(this.peek())) {
    result += this.pop();
  }
  return result;
};

TextStream.prototype.eatWhitespace = function() {
  var isWhitespace = function(item) {
    return /[\s\n\t]/.test(item);
  };
  this.popWhile(isWhitespace);
};

TextStream.prototype.parseText = function() {
  var isAlphanumeric = function(item) {
    return /[a-zA-Z0-9\-]/.test(item);
  };
  return this.popWhile(isAlphanumeric);
};

TextStream.prototype.startsWith = function(string) {
  var begin = this.position;
  var end = this.position + string.length;
  if (end > this.input.length){
    return false;
  }
  else{
    return string === this.input.substring(begin, end);
  }
};
