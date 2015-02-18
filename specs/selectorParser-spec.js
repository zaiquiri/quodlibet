describe("SelectorParser", function() {

  var SelectorParser = require('../src/selectorParser.js');

  describe("getSelectorsFrom", function(){

    it("should parse only first rule when given multiple rules", function() {
      var rule = '.nav h2 { display: none; } h1 { font-style: bold; }';
      var selectorParser = new SelectorParser();

      var selectors = selectorParser.getSelectorsFrom(rule);

      expect(selectors).toEqual({tagName: ['h2'], 'class':['.nav'], id:[]} );

    });

    it("should return selector with one tag name for rule with one tag name", function() {
      var rule = 'h1 { font-style: bold; }';
      var selectorParser = new SelectorParser();

      var selectors = selectorParser.getSelectorsFrom(rule);

      expect(selectors).toEqual({tagName: ['h1'], 'class':[], id:[]} );
    });

    it("should return selector with one class for rule with one class", function() {
      var rule = '.navbar { font-style: bold; }';
      var selectorParser = new SelectorParser();

      var selectors = selectorParser.getSelectorsFrom(rule);

      expect(selectors).toEqual({tagName: [], "class": ['.navbar'], id:[]} );
    });

    it("should return selector with one id for rule with one id", function() {
      var rule = '#infobox { font-style: bold; }';
      var selectorParser = new SelectorParser();

      var selectors = selectorParser.getSelectorsFrom(rule);

      expect(selectors).toEqual({tagName: [], "class": [], id:['#infobox']} );

    });

    xit("should return selector for rule with multiple selectors", function() {
      var rule = 'h1 h2 .navbar .sidebar .footer #infobox #icon { font-style: bold; }';
      var selectorParser = new SelectorParser();

      var selectors = selectorParser.getSelectorsFrom(rule);

      expect(selectors).toEqual({tagName: ['h1', 'h2'], "class": ['.navbar', 'sidebar', '.footer'], id:['#infobox', '#icon']} );

    });

  });

});
