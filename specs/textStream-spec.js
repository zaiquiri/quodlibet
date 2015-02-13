describe("textStream", function() {
  var TextStream = require('../src/textStream.js');
  var ts;

  describe("peek", function() {

    it("should return next character but not advance", function() {
      var rawText = "Some raw text";
      ts = new TextStream(rawText);

      expect(ts.peek()).toBe('S');
      expect(ts.peek()).toBe('S');
    });
  });

  describe("eof", function() {

    it("should return false when characters still remain", function() {
      ts = new TextStream("Some raw text");
      expect(ts.eof()).toBe(false);
    });

    it("should return true when no characters remain", function() {
      var rawText = "Some raw text";
      ts = new TextStream("Some raw text", rawText.length);

      expect(ts.eof()).toBe(true);
    });

    it("should true when text is empty", function() {
      ts = new TextStream("");
      expect(ts.eof()).toBe(true);
    });

  });

  describe("pop", function() {
    it("should return next character and advance", function() {
      ts = new TextStream("Some raw text");
      expect(ts.pop()).toBe('S');
      expect(ts.pop()).toBe('o');
      expect(ts.pop()).toBe('m');
    });

    it("should throw RangeError when no more characters remain", function(){
      ts = new TextStream("");
      expect(ts.pop.bind(ts)).toThrow(new RangeError("Nothing more to pop!"));
    });
  });

  describe("popWhile", function() {
    it("should return string until condition is false", function(){
      ts = new TextStream("Some raw text");
      var isNotASpace = function(next){return !/\s/.test(next);};
      expect(ts.popWhile(isNotASpace)).toBe("Some");
    });

    it("should return entire string if condition is never false", function(){
      var rawText = "Some raw text";
      ts = new TextStream(rawText);
      var isNotZ = function(next){return !/z/.test(next);};
      expect(ts.popWhile(isNotZ)).toBe(rawText);
    });
  });

  describe("popUntil", function() {
    it("should return string until condition is true", function(){
      ts = new TextStream("Some raw text");
      var isASpace = function(previous, next){return /\s/.test(next);};
      expect(ts.popUntil(isASpace)).toBe("Some");
    });

    it("should return entire string if condition is never true", function(){
      var rawText = "Some raw text";
      ts = new TextStream(rawText);
      var isZ = function(previous, next){return /z/.test(next);};
      expect(ts.popUntil(isZ)).toBe(rawText);
    });
    
  });

  describe("eatWhitespace", function(){
    it("should consume text until the next character is not a space", function(){
      ts = new TextStream("       Not a space");
      ts.eatWhitespace();
      expect(ts.peek()).toBe('N');
    });

    it("should count new lines and tabs as whitespace", function(){
      ts = new TextStream(" \n\tNot a space");
      ts.eatWhitespace();
      expect(ts.peek()).toBe('N');
    });

    it("Shouldn't consume anything if there's no whitespace", function(){
      ts = new TextStream("Some raw text");
      ts.eatWhitespace();
      expect(ts.peek()).toBe('S');
    });
  });

  describe("parseText", function(){
    it("should return all alphanumeric text until the first space", function(){
      ts = new TextStream("Letters123 after space");
      expect(ts.parseText()).toBe("Letters123");
    });

    it("should return all alphanumeric text until first special character", function(){
      ts = new TextStream("Letters123<after special character");
      expect(ts.parseText()).toBe("Letters123");
    });

    it("should return all alphanumeric text including dashes", function(){
      ts = new TextStream("Letters-123 after space");
      expect(ts.parseText()).toBe("Letters-123");
    });

    it("should return empty string if next char isn't isAlphanumeric", function(){
      ts = new TextStream("<div>");
      expect(ts.parseText()).toBe("");
    });
  });

  describe("startsWith", function(){
    it("should return true if next characters match string, and not advance", function(){
      ts = new TextStream("Some raw text");
      expect(ts.startsWith("Som")).toBe(true);
      expect(ts.peek()).toBe('S');
    });

    it("should return false if next characters do not match string, and not advance", function(){
      ts = new TextStream("Some raw text");
      expect(ts.startsWith("raw")).toBe(false);
      expect(ts.peek()).toBe('S');
    });

    it("should return false if no more characters in string", function(){
      ts = new TextStream("");
      expect(ts.startsWith("Some")).toBe(false);
    });
  });
});

