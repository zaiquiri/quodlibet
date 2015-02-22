DeclerationParser.prototype.getDeclerationsFrom = function(rule){
  rule = new this.TextStream(rule);
  var endOfRule = function(previous, next){ return '}' === next; }
  rule.popUntil(function(previous){ return previous === '{' });
  var declerationList = rule.popUntil(endOfRule);
  var declerationTokens = declerationList.split(';')
    .filter(function(z){ return !(/^\s*$/.test(z))});
  var declerations = declerationTokens.map(function(decleration){
    pair = decleration.split(':').filter(function(z){ return !(/^\s*$/.test(z))});
    console.log(pair)
    pair = pair.map(function(z){return z.trim();});
    return { name:pair[0], value:pair[1] };
  })
  return declerations

};

module.exports = DeclerationParser;

function DeclerationParser(textStream){
  this.TextStream = textStream;
}
