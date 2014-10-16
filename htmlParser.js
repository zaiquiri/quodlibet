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

function pop() {
  return input.charAt(position++);
}

function popWhile(condition) {
  var result = "";
  while (!eof() && condition(this.peek)) {
    result += this.pop;
  }
  return result;
}

function eatWhitespace() {
  var isWhitespace = function(item) {
    return /[\s\n\t]*/.test(item)
  }
  this.popWhile(isWhitespace);
}

function parseName() {
  var isAlphanumeric = function(item) {
    return /[a-zA-Z0-9]*/.test(item)
  }
  return popWhile(isAlphanumeric);
}

function parseNodes() {
  var nodes = [];
  while (!this.eof() && !this.startsWith("</")){
    nodes.push(this.parseNode())
  } 
  return nodes;
}

function parseNode() {
  if (/</.test(this.peek()){
    return this.parseElement()
  } else {
    return this.parseText()
  }
}

function parseText() {
  return new Text(parseName())
}

function parseElement {
  var elementName = ""
  var children = []
  var attributes = {}

  this.pop() // '<'
  elementName = this.parseName()
  this.pop() // '>'

  attributes = this.parseAttrs()
  children = this.parseNodes()

  this.pop() // '<'
  this.pop() // '/'
  this.parseName()
  this.pop() // '>'

  return new Element(elementName, attributes, children); 
}

HtmlParser.prototype = {
  getNodeTree: function() {
    return this.parseInput();
  }
}

module.exports = HtmlParser;
