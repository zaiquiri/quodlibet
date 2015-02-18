describe("SelectorParser", function() {

  var SelectorParser = require('../src/selectorParser.js');

  describe("getSelectorsFrom", function(){

    xit("should return empty array for invalid rule", function() {

    });

    it("should return array of one selector with tag name for one rule with tag name", function() {
      var rule = 'h1 { font-style: bold; }';
      var selectorParser = new SelectorParser();

      var selectors = selectorParser.getSelectorsFrom(rule);

      expect(selectors).toEqual([{tagName: 'h1'}]);
    });

    xit("should return array of one selector with class for one rule with class", function() {

    });

    xit("should return array of one selector with id for one rule with id", function() {

    });

    xit("should return array of one selector for rule with multiple selectors", function() {

    });

    xit("should return array of selectors for multiple rules with multiple selectors", function() {

    });

  });

});
