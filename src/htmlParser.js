var Element = require('./element.js');
var Assert = require('./assert.js');

module.exports = HtmlParser;

function HtmlParser(textStream) {
  this.ts = textStream;
}

HtmlParser.prototype.createNodeTree = function() {
  var nodes = this.parseNodes();
  if (nodes.length === 1) {
    return nodes[0];
  } else {
    return new Element("html", null, nodes);
  }
};

HtmlParser.prototype.parseNodes = function() {
  var nodes = [];
  while (!this.ts.eof() && !this.ts.startsWith("</")){
    this.ts.eatWhitespace();
    nodes.push(this.parseNode());
  }
  return nodes;
};

HtmlParser.prototype.parseNode = function() {
  if (/</.test(this.ts.peek())){
    return this.parseElement();
  } else {
    var text = this.ts.parseText();
    return text ;
  }
};

HtmlParser.prototype.parseElement = function() {
  var elementName = "";
  var children = [];
  var attributes = {};

  Assert.that(this.ts.pop() === '<');
  elementName = this.ts.parseText();
  this.ts.eatWhitespace();
  attributes = this.parseAttrs();
  this.ts.eatWhitespace();
  Assert.that(this.ts.pop() === '>');
  this.ts.eatWhitespace();

  children = this.parseNodes();

  this.ts.eatWhitespace();
  Assert.that(this.ts.pop() === '<');
  Assert.that(this.ts.pop() === '/');
  this.ts.parseText();
  Assert.that(this.ts.pop() === '>');
  this.ts.eatWhitespace();

  return new Element(elementName, attributes, children);
};

HtmlParser.prototype.parseAttrs = function() {
  var attrs =[];
  while (!/>/.test(this.ts.peek())) {
    attrs.push(this.parseAttr());
  }
  return attrs;
};

HtmlParser.prototype.parseAttr = function() {
  var name = this.ts.parseText();
  Assert.that(this.ts.pop() === '=');
  Assert.that(this.ts.pop() === '"');
  var isNotEndingQuote = function(item) { return !/"/.test(item); };
  var value = this.ts.popWhile(isNotEndingQuote);
  Assert.that(this.ts.pop() === '"');
  this.ts.eatWhitespace();
  return {"name":name, "value":value};
};
