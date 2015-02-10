describe("assert", function() {
  var Assert;

  beforeEach(function(){
    Assert = require('../src/assert.js');
  });

  it("should throw error when condition is false", function() {
    expect(function(){Assert.that(false);}).toThrow();
  });

  it("should not throw error when condition is true", function() {
    expect(function(){Assert.that(true);}).not.toThrow();
  });

});
