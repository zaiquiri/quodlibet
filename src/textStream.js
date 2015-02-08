module.exports = Parser;

function Parser(text, start){
  this.input = text;
  this.position = start || 0;
}

Parser.prototype.peek = function() {
  return this.input.charAt(this.position);
};

Parser.prototype.eof = function() {
  return this.position >= this.input.length;
};

Parser.prototype.pop = function() {
  if (this.eof()){
    throw new RangeError("Nothing more to pop!");
  } else{
    return this.input.charAt(this.position++);
  }
};

Parser.prototype.popWhile = function(condition) {
  var result = "";
  while (!this.eof() && condition(this.peek())) {
    result += this.pop();
  }
  return result;
};

Parser.prototype.eatWhitespace = function() {
  var isWhitespace = function(item) {
    return /[\s\n\t]/.test(item);
  };
  this.popWhile(isWhitespace);
};

Parser.prototype.parseText = function() {
  var isAlphanumeric = function(item) {
    return /[a-zA-Z0-9\-]/.test(item);
  };
  return this.popWhile(isAlphanumeric);
};

Parser.prototype.startsWith = function(string) {
  var begin = this.position;
  var end = this.position + string.length;
  if (end > this.input.length){
    return false;
  }
  else{
    return string === this.input.substring(begin, end);
  }
};
