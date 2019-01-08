var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('3/DATA', 'utf8', function (err, contents) {    

    var parseBox = function(boxIn) {
        var box = {};
        box.parsed = boxIn.split(" ");
        box.id = box.parsed[0];
        box.matrixPosition = {};
        box.matrixPosition.id = box.parsed[2].slice(0, -1);
        box.parsedPosition = box.matrixPosition.id.split(',');
        box.matrixPosition.x = box.parsedPosition[0];
        box.matrixPosition.y = box.parsedPosition[1];
        
        box.size = {};
        box.size.raw = box.parsed[3];
        box.size.parsed = box.size.raw.split('x');
        box.size.x = box.size.parsed[0];
        box.size.y = box.size.parsed[1];

        return box;
    }

    var hasOverlap = [];
    var processBox = function(matrixOut, boxIn) {        

        for (var x = 0; x < boxIn.size.x; x++) {
            for (var y = 0; y < boxIn.size.y; y++) {
                var matrixSquareX = parseInt(boxIn.matrixPosition.x) + x;
                var matrixSquareY = parseInt(boxIn.matrixPosition.y) + y;
                var matrixId = matrixSquareX + "," + matrixSquareY;
                
                if (!matrixOut[matrixId]) {
                    matrixOut[matrixId] = [boxIn.id];
                } else if (!matrixOut[matrixId].includes(boxIn.id)) {
                    matrixOut[matrixId].push(boxIn.id);
                }
                if (matrixOut[matrixId].length > 1) {
                    for (var i=0; i<matrixOut[matrixId].length; i++) {
                        if (!hasOverlap.includes(matrixOut[matrixId][i])) {
                            hasOverlap.push(matrixOut[matrixId][i]);
                        }
                    }
                }
            }
        }
    }

    var c = splitLines(contents);

    var boxes = [];  // parsed boxes
    var matrix = {}; // matrix of one inch boxes
    matrix.count = 0;
        
    c.forEach(function(l, i) {
        var box = parseBox(l);
        boxes.push(box);
        processBox(matrix, box);
    });

    var result;
    for (var i=0; i<boxes.length; i++) {
        if (!hasOverlap.includes(boxes[i].id)) {
            result = boxes[i].id;
        }
    }

    console.log(result);
   
});

 