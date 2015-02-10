describe("htmlParser", function(){

  it("should create a node tree for proper html text", function() {
    var html = '<html>' +
        '<div class="myClass">' +
          '<p>someText</p>' +
          '<p>some-more-text</p>' +
        '</div>' +
        '<div id="silent-div" style="some-stylIn"></div>' +
        '<div id="clara" class="special-things" >' +
          '<div></div>' +
        '</div>' +
      '</html>';

    var correctNodeTree = {
      "tagName":"html",
      "attributes":[],
      "children":[{
          "tagName":"div",
          "attributes":[{"name":"class","value":"myClass"}],
          "children":[{
              "tagName":"p",
              "attributes":[],
              "children":["someText"]
            },
            {
              "tagName":"p",
              "attributes":[],
              "children":["some-more-text"]
            }
          ]
        },
        {
          "tagName":"div",
          "attributes":[
            {"name":"id","value":"silent-div"},
            {"name":"style","value":"some-stylIn"}
          ],
          "children":[]
        },
        {
          "tagName":"div",
          "attributes":[{"name":"id","value":"clara"},{"name":"class","value":"special-things"}],
          "children":[{
            "tagName":"div",
            "attributes":[],
            "children":[]
          }]
        }
      ]
    };

    var HtmlParser = require('../src/htmlParser.js');
    var TextStream = require('../src/textStream.js');
    var ts = new TextStream(html);
    var htmlP = new HtmlParser(ts);

    expect(htmlP.createNodeTree()).toEqual(correctNodeTree);

  });

});
