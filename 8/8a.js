var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('8/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
    var treeInput = c[0].split(" ");
    var metaSum = 0;
    var node = function(input) {
        var theNode = {}; 
        theNode.numChildren = input.shift();
        theNode.numMeta     = input.shift();
        theNode.children    = [];
        theNode.metaData    = [];
        for (var i=0; i<theNode.numChildren; i++) {
            let n = node(input);
            theNode.children.push(n); 
        }
        for (var i=0; i<theNode.numMeta; i++) {
            let meta = parseInt(input.shift());
            metaSum += meta;
            theNode.metaData.push(meta)
        }
        return theNode;
    }

    var tree = node(treeInput);

    console.log(metaSum);
})
