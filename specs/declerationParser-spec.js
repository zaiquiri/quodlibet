describe("Decleartion Parser", function(){

  var TextStream = require('../src/textStream.js');
  var DeclerationParser = require('../src/declerationParser.js');

  it("should return empty array for rule with no declerations", function() {
      var rule = 'h1 {}';

      var declerationParser = new DeclerationParser(TextStream);
      var declerations = declerationParser.getDeclerationsFrom(rule);

      expect(declerations).toEqual([]);

  });

  it("should return array of one decleration for rule with one decleration", function() {
      var rule = 'h1 { font-style: bold; }';

      var declerationParser = new DeclerationParser(TextStream);
      var declerations = declerationParser.getDeclerationsFrom(rule);

      expect(declerations).toEqual([{name: 'font-style', value: 'bold'}]);

  });
});
