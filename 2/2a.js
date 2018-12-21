var fs = require('fs');
const splitLines = require('split-lines');


fs.readFile('DATA', 'utf8', function (err, contents) {
    var index = function (s) {
        var counts = { twoCount:null, threeCount:null };

        var chars = s.split("");
        var result = {};

        chars.forEach(function (c, i) {
            if (!result[c]) { result[c] = 0; };
            result[c] += 1;
            
        });

        for (var key in result) {
            // skip loop if the property is from prototype
            if (!result.hasOwnProperty(key)) continue;
            if (result[key] == 2) {
                counts.twoCount = 1;
            }
            if (result[key] == 3) {
                counts.threeCount = 1;
            }
            if (counts.twoCount && counts.threeCount) { break; }
        }
        return counts;
    }

    var c = splitLines(contents);

    var twoCount = 0;
    var threeCount = 0;
    for (var i = 0; i < c.length; i++) {
        var itemIndex = index(c[i]); 
        twoCount += itemIndex.twoCount;
        threeCount += itemIndex.threeCount;
    }
    console.log(twoCount * threeCount);
});

 