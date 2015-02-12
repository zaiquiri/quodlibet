describe("cssParser", function(){

  it("should return array of one rule for css with one rule", function() {
    var CssParser = require('../src/cssParser.js');
    var TextStream = require('../src/textStream.js');
    var css = 'h1 { font-size: 12px; }';
    var textStream = new TextStream(css);
    var selectorParser = {
      parse: function(){ return [{tagName: "h1"}]; }
    };
    var declerationParser = {
      parse: function(){ return [{name:"font-size", value: "12px"}]; }
    };
    var cssP = new CssParser(textStream, selectorParser, declerationParser);
    var rules = [
      {
        selectors: [{tagName: "h1"}],
        declerations: [{name:"font-size", value: "12px"}]
      }
    ];

    expect(cssP.createRules()).toEqual(rules);
  });

});
