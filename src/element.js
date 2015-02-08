var tagName = ""
var attributes = {};
var children = [];

function Element(tagName, attributes, children){
  this.tagName = tagName;
  this.attributes = attributes;
  this.children = children;
}

module.exports = Element;
