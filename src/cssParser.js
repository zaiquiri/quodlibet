var TextStream = require('../src/textStream.js');
module.exports = CssParser;

function CssParser(textStream, selectorParser, declerationParser) {
  this.textStream = textStream;
  this.selectorParser = selectorParser;
  this.declerationParser = declerationParser;
}

CssParser.prototype.createRules = function(){
  var wasACloseBracket = function(previous){return /}/.test(previous);};
  var rules = [];
  while (!this.textStream.eof()){
    var rule = new TextStream(this.textStream.popUntil(wasACloseBracket));
    rules.push({
      selectors: this.selectorParser.getSelectorsFrom(rule),
      declerations: this.declerationParser.getDeclerationsFrom(rule)
    });
  }
  return rules;
};
