DeclerationParser.prototype.getDeclerationsFrom = function(rule){
  rule = new this.TextStream(rule);

  this.fastFowardToDeclerations(rule);
  var declerationList = rule.popUntil(this.endOfRule);

  var declerations = declerationList.split(';')
    .filter(this.isNotWhiteSpace)
    .map(this.extractToPair.bind(this));

  return declerations;
};

DeclerationParser.prototype.isNotWhiteSpace = function(z){
  return !(/^\s*$/.test(z));
};

DeclerationParser.prototype.endOfRule = function(previous, next){ 
  return '}' === next;
};

DeclerationParser.prototype.fastFowardToDeclerations = function(rule){ 
  rule.popUntil(function(previous){ return previous === '{'; });
};

DeclerationParser.prototype.extractToPair = function(decleration){
  var pair = decleration.split(':').map(function(z){return z.trim();});
  return { name:pair[0], value:pair[1] };
};

module.exports = DeclerationParser;

function DeclerationParser(textStream){
  this.TextStream = textStream;
}
