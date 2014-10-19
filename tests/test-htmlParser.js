var HtmlParser = require('./htmlParser.js')
var fs = require('fs')

var htmlText = fs.readFileSync('./testPage.html', "utf8")
var nodeTree = HtmlParser.createNodeTreeFor(htmlText)

console.log(nodeTree)
