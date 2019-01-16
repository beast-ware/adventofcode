var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('8/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
    var treeInput = c[0].split(" ");

    var node = function(input) {
        var theNode = {}; 
        theNode.numChildren = input.shift();
        theNode.numMeta     = input.shift();
        theNode.children    = [];
        theNode.metaData    = [];
        theNode.value       = 0;
        for (var i=0; i<theNode.numChildren; i++) {
            let n = node(input);
            theNode.children.push(n); 
        }
        var metaSum = 0;
        for (var i=0; i<theNode.numMeta; i++) {
            let meta = parseInt(input.shift());
            metaSum += meta;
            theNode.metaData.push(meta)
        }
        if (theNode.children.length < 1) {
            theNode.value = metaSum; 
        } else {
            for (var i=0; i<theNode.metaData.length; i++) {
                if (theNode.children[theNode.metaData[i] - 1]) {
                    theNode.value += theNode.children[theNode.metaData[i] - 1].value;
                }
            }
        }
        return theNode;
    }

    var tree = node(treeInput);

    console.log(metaSum);
})
