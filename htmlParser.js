var input = "";
var position = 0;

function HtmlParser(input) {
  this.input = input;
}

function peek() {
  return input.charAt(position);
}

function eof() {
  return position >= input.length;
}

function next() {
  return input.charAt(position++);
}

function nextWhile(condition) {
  var result = "";
  while (!eof() && condition(this.peek)) {
    result += this.next;
  }
  return result;
}

function eatWhitespace() {
  var isWhitespace = function(item) {
    return /\s/.test(item)
  }
  this.nextWhile(isWhitespace);
}

function parseName() {
  var isAlphanumeric = function(item) {
    return /[a-zA-Z0-9]/.test(item)
  }
  return nextWhile(isAlphanumeric);
}

function parseNode() {
  if (/</.test(this.peek)){
    this.parseElement();
  else {
    this.parseText();
}

HtmlParser.prototype = {
  getNodeTree: function() {
    return this.parseInput();
  }
}

module.exports = HtmlParser;
