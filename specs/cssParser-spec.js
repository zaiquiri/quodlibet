describe("cssParser", function(){
  var CssParser = require('../src/cssParser.js');
  var TextStream = require('../src/textStream.js');

  it("should return array of one rule for css with one rule", function() {
    var css = 'h1 { font-size: 12px; }';
    var textStream = new TextStream(css);

    var selectorParser = jasmine.createSpyObj('selectorParser', ['getSelectorsFrom']);
    selectorParser.getSelectorsFrom.andReturn([{tagName: "h1"}]);

    var declerationParser = jasmine.createSpyObj('declerationParser', ['getDeclerationsFrom']);
    declerationParser.getDeclerationsFrom.andReturn([{name:"font-size", value: "12px"}]);

    var cssP = new CssParser(textStream, selectorParser, declerationParser);
    var rules = [
      {
        selectors: [{tagName: "h1"}],
        declerations: [{name:"font-size", value: "12px"}]
      }
    ];

    expect(cssP.createRules()).toEqual(rules);
    expect(declerationParser.getDeclerationsFrom).toHaveBeenCalledWith(css);
    expect(selectorParser.getSelectorsFrom).toHaveBeenCalledWith(css);
  });

  it("should return an empty array when there are no rules", function() {
    var textStream = new TextStream('');
    var cssP = new CssParser(textStream);

    expect(cssP.createRules()).toEqual([]);
  });

  it("should call selector and decleration parser once for each rule", function(){
    var ruleOne = 'h1 { font-size: 12px; }';
    var ruleTwo = 'div { display: none; position: absolute; }';
    var ruleThree = '.header { float: right; }';
    var css = ruleOne + ruleTwo + ruleThree;

    var textStream = new TextStream(css);
    var selectorParser = jasmine.createSpyObj('selectorParser', ['getSelectorsFrom']);
    var declerationParser = jasmine.createSpyObj('declerationParser', ['getDeclerationsFrom']);
    var cssP = new CssParser(textStream, selectorParser, declerationParser);

    cssP.createRules();

    expect(selectorParser.getSelectorsFrom).toHaveBeenCalledWith(ruleOne);
    expect(selectorParser.getSelectorsFrom).toHaveBeenCalledWith(ruleTwo);
    expect(selectorParser.getSelectorsFrom).toHaveBeenCalledWith(ruleThree);

    expect(declerationParser.getDeclerationsFrom).toHaveBeenCalledWith(ruleOne);
    expect(declerationParser.getDeclerationsFrom).toHaveBeenCalledWith(ruleTwo);
    expect(declerationParser.getDeclerationsFrom).toHaveBeenCalledWith(ruleThree);

  });

});
