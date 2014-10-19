var Element = require('./element.js')
var Assert = require('./assert.js')

var input = {
  text : "",
  position : 0
}

exports.createNodeTreeFor = function(text) {
  input.text = text
  input.position = 0
  return parseInput()
}

function parseInput() {
  var nodes = parseNodes()
  if (nodes.length === 1) {
    return nodes[0]
  } else {
    return new Element("html", null, nodes)
  }
}

function parseNodes() {
  var nodes = []
  while (!eof() && !startsWith("</")){
    eatWhitespace()
    nodes.push(parseNode())
  }
  return nodes
}

function parseNode() {
  if (/</.test(peek())){
    return parseElement()
  } else {
    var text = parseText();
    return text 
  }
}

function parseElement() {
  var elementName = ""
  var children = []
  var attributes = {}

  Assert.that(pop() === '<', "line 46")
  elementName = parseText()
  eatWhitespace()
  attributes = parseAttrs()
  eatWhitespace()
  Assert.that(pop() === '>', "line 49")
  eatWhitespace()

  children = parseNodes()

  eatWhitespace()
  Assert.that(pop() === '<', "line 55")
  Assert.that(pop() === '/', "line 56")
  parseText()
  Assert.that(pop() === '>', "line 58")
  eatWhitespace()

  return new Element(elementName, attributes, children); 
}

function parseAttrs() {
  var attrs =[]
  while (!/>/.test(peek())) {
    attrs.push(parseAttr())
  }
  return attrs
}

function parseAttr() {
  var name = parseText()
  Assert.that(pop() === '=', "line 74")
  Assert.that(pop() === '"', "line 76")
  var isNotEndingQuote = function(item) { return !/"/.test(item) }
  var value = popWhile(isNotEndingQuote)
  Assert.that(pop() === '"', "line 81")
  eatWhitespace()
  return {name:value}
}

// CANDIDATE FUNCTIONS FOR PARSER CLASS

function peek() {
  return input.text.charAt(input.position)
}

function eof() {
  return input.position >= input.text.length
}

function pop() {
  return input.text.charAt(input.position++)
}

function popWhile(condition) {
  var result = ""
  while (!eof() && condition(peek())) {
    result += pop()
  }
  return result
}

function eatWhitespace() {
  var isWhitespace = function(item) {
    return /[\s\n\t]/.test(item)
  }
  popWhile(isWhitespace)
}

function parseText() {
  var isAlphanumeric = function(item) {
    return /[a-zA-Z0-9\-]/.test(item)
  }
  return popWhile(isAlphanumeric)
}

function startsWith(string) {
  var begin = input.position
  var end = input.position + string.length
  if (end > input.text.length){
    return false
  }
  else{
    return string === input.text.substring(begin, end)
  }
}

