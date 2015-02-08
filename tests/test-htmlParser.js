var HtmlParser = require('../src/htmlParser.js')
var fs = require('fs')

var htmlText = fs.readFileSync('./tests/testPage.html', "utf8")
var nodeTree = HtmlParser.createNodeTreeFor(htmlText)

console.log(nodeTree)
