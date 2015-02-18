var TextStream = require('../src/textStream.js');

module.exports = SelectorParser;

function SelectorParser(){}

SelectorParser.prototype.getSelectorsFrom = function(rule){
  rule = new TextStream(rule);
  var declerationsBegin = function(previous, next){ return next === '{'; };
  var isClassSelector = function(token){return /^\.[a-zA-Z\-\_]*$/.test(token);};
  var isId = function(token){ return /^\#[a-zA-Z\-\_]*$/.test(token); };
  var isTag = function(token){ return !isClassSelector(token) && !isId(token);};
  var emptyStrings = function(token){ return token !== '';};
  var trim = function(token){return token.trim();};

  var selectors = rule.popUntil(declerationsBegin);
  var selectorTokens = selectors.split(/\s/).filter(emptyStrings).map(trim);
  return  {
    tagName: selectorTokens.filter(isTag),
    'class': selectorTokens.filter(isClassSelector),
    id: selectorTokens.filter(isId)
  };
};
