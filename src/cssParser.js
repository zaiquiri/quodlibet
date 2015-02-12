var TextStream = require('../src/textStream.js');
module.exports = CssParser;

function CssParser(textStream, selectorParser, declerationParser) {
  this.textStream = textStream;
  this.selectorParser = selectorParser;
  this.declerationParser = declerationParser;
}

CssParser.prototype.createRules = function(){
  var rule;
  var rules = [];
  var previous;
  var isNotTheEndOfARule = function(current){
    var wasCloseBracket =  !/}/.test(previous); 
    previous = current;
    return wasCloseBracket;
  };

  while (!this.textStream.eof()){
    ruleStream = new TextStream(this.textStream.popWhile(isNotTheEndOfARule));
    rules.push({
      selectors: this.selectorParser.parse(ruleStream),
      declerations: this.declerationParser.parse(ruleStream)
    });
  }
  return rules;
};
