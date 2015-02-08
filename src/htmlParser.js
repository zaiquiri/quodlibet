var Element = require('./element.js');
var Assert = require('./assert.js');
var TextStream = require('./textStream.js');

var ts;

exports.createNodeTreeFor = function(text) {
  ts = new TextStream(text);
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
  while (!ts.eof() && !ts.startsWith("</")){
    ts.eatWhitespace();
    nodes.push(parseNode());
  }
  return nodes;
}

function parseNode() {
  if (/</.test(ts.peek())){
    return parseElement();
  } else {
    var text = ts.parseText();
    return text ;
  }
}

function parseElement() {
  var elementName = "";
  var children = [];
  var attributes = {};

  Assert.that(ts.pop() === '<');
  elementName = ts.parseText();
  ts.eatWhitespace();
  attributes = parseAttrs();
  ts.eatWhitespace();
  Assert.that(ts.pop() === '>');
  ts.eatWhitespace();

  children = parseNodes();

  ts.eatWhitespace();
  Assert.that(ts.pop() === '<');
  Assert.that(ts.pop() === '/');
  ts.parseText();
  Assert.that(ts.pop() === '>');
  ts.eatWhitespace();

  return new Element(elementName, attributes, children);
}

function parseAttrs() {
  var attrs =[];
  while (!/>/.test(ts.peek())) {
    attrs.push(parseAttr());
  }
  return attrs;
}

function parseAttr() {
  var name = ts.parseText();
  Assert.that(ts.pop() === '=');
  Assert.that(ts.pop() === '"');
  var isNotEndingQuote = function(item) { return !/"/.test(item); };
  var value = ts.popWhile(isNotEndingQuote);
  Assert.that(ts.pop() === '"');
  ts.eatWhitespace();
  return {"name":name, "value":value};
}
