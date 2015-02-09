describe("assert", function() {

  it("should throw error when condition is false", function() {
    var Assert = require('../src/assert.js');
    var assertWithFalseCondition = function() {
      Assert.that(false);
    };
    expect(assertWithFalseCondition).toThrow();
  });

  it("should not throw error when condition is true", function() {
    var Assert = require('../src/assert.js');
    var assertWithFalseCondition = function() {
      Assert.that(true);
    };
    expect(assertWithFalseCondition).not.toThrow();
  });

  it("Should throw with default message when none is given");
  it("Should throw with custom message when provided");

});
