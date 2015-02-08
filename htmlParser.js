var Element = require('./element.js');
var Assert = require('./assert.js');
var Parser = require('./parser.js');

var input;

exports.createNodeTreeFor = function(text) {
  input = new Parser(text);
  return parseHTML();
};

function parseHTML() {
  var nodes = parseNodes();
  if (nodes.length === 1) {
    return nodes[0];
  } else {
    return new Element("html", null, nodes);
  }
}

function parseNodes() {
  var nodes = [];
  while (!input.eof() && !input.startsWith("</")){
    input.eatWhitespace();
    nodes.push(parseNode());
  }
  return nodes;
}

function parseNode() {
  if (/</.test(input.peek())){
    return parseElement();
  } else {
    var text = input.parseText();
    return text ;
  }
}

function parseElement() {
  var elementName = "";
  var children = [];
  var attributes = {};

  Assert.that(input.pop() === '<');
  elementName = input.parseText();
  input.eatWhitespace();
  attributes = parseAttrs();
  input.eatWhitespace();
  Assert.that(input.pop() === '>');
  input.eatWhitespace();

  children = parseNodes();

  input.eatWhitespace();
  Assert.that(input.pop() === '<');
  Assert.that(input.pop() === '/');
  input.parseText();
  Assert.that(input.pop() === '>');
  input.eatWhitespace();

  return new Element(elementName, attributes, children);
}

function parseAttrs() {
  var attrs =[];
  while (!/>/.test(input.peek())) {
    attrs.push(parseAttr());
  }
  return attrs;
}

function parseAttr() {
  var name = input.parseText();
  Assert.that(input.pop() === '=');
  Assert.that(input.pop() === '"');
  var isNotEndingQuote = function(item) { return !/"/.test(item); };
  var value = input.popWhile(isNotEndingQuote);
  Assert.that(input.pop() === '"');
  input.eatWhitespace();
  return {"name":name, "value":value};
}
