var HtmlParser = require('./htmlParser.js')
var fs = require('fs')

var file = fs.readFileSync('./testPage.html', "utf8")

var parser = new HtmlParser(file)
var nodeTree = parser.getNodeTree()

console.log(nodeTree)
