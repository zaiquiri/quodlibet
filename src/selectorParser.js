var TextStream = require('../src/textStream.js');

module.exports = SelectorParser;

function SelectorParser(){}

SelectorParser.prototype.getSelectorsFrom = function(rule){
  rule = new TextStream(rule);
  var declerationsBegin = function(previous, next){ return next === '{'; };
  var selectors = rule.popUntil(declerationsBegin);
  return [ {tagName: selectors.trim()} ];

};
