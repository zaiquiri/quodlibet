SelectorParser.prototype.getSelectorsFrom = function(rule){
  rule = new this.TextStream(rule);

  var selectors = rule.popUntil(this.declerationsBegin);
  var selectorTokens = selectors.split(/\s/)
    .filter(this.notAnEmptyString)
    .map(function(z){return z.trim();});

  return  {
    tagName: selectorTokens.filter(this.isTag),
    'class': selectorTokens.filter(this.isClass),
    id: selectorTokens.filter(this.isId)
  };
};

SelectorParser.prototype.declerationsBegin = function(previous, next){
  return next === '{';
};

SelectorParser.prototype.isClass = function(token){
  return /^\.[a-zA-Z\-\_]*$/.test(token);
};

SelectorParser.prototype.isId = function(token){
  return /^\#[a-zA-Z\-\_]*$/.test(token);
};

SelectorParser.prototype.isTag = function(token){
  return !this.isClass(token) && !this.isId(token);
}.bind(SelectorParser.prototype);

SelectorParser.prototype.notAnEmptyString = function(token){
  return token !== '';
};

SelectorParser.prototype.trim = function(token){
  return token !== '';
};

module.exports = SelectorParser;

function SelectorParser(textStream){
  this.TextStream = textStream;
}

