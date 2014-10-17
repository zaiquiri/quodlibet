var Element = require('./element.js');
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
    return /[\s\n\t]/.test(item)
  }
  this.popWhile(isWhitespace);
}

function parseText() {
  var isAlphanumeric = function(item) {
    return /[a-zA-Z0-9]/.test(item)
  }
  return popWhile(isAlphanumeric);
}

function startsWith(string) {
  return string === this.input.substring(this.position, string.length);
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

function parseElement {
  var elementName = ""
  var children = []
  var attributes = {}

  this.pop() // '<'
  elementName = this.parseText()
  attributes = this.parseAttrs()
  this.pop() // '>'
  this.eatWhitespace()

  children = this.parseNodes()

  this.eatWhitespace()
  this.pop() // '<'
  this.pop() // '/'
  this.parseText()
  this.pop() // '>'

  return new Element(elementName, attributes, children); 
}

function parseAttrs() {
  var attrs =[]; 
  this.eatWhitespace();
  while (!/>/.test(this.peek())) {
    attrs.push(this.parseAttr());
  }
  return attrs;
}

function parseAttr() {
  this.eatWhitespace();
  var name = this.parseText();
  this.pop() // '='
  this.pop() // '"'
  var quotesHaveNotEnded = function(item) {
    return !/"/.test(item)
  }
  var value = popWhile(quotesHaveNotEnded);
  this.pop() // '"'
  return {name:value}
}

function parseInput() {
  var nodes = this.parseNodes()
  if (nodes.length === 1) {
    return nodes;
  } else {
    return new Element("html", null, nodes);
  } 
}

HtmlParser.prototype = {
  getNodeTree: function() {
    return this.parseInput();
  }
}

module.exports = HtmlParser;
