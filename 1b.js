var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('DATA', 'utf8', function (err, contents) {
    var freqCounts = {};
    var checkFreq = function (f) {
        if (!freqCounts[f]) {
            freqCounts[f] = 1;
            return false;
        } else {
            return true;
        }        
    }

    var c = splitLines(contents);

    var sum = 0;
    var found = false;
    var i = 0;
    while (!found) {
        sum += parseInt(c[i]);
        if (checkFreq(sum)) { found = true; }
        i++;
        if (i == c.length) { i = 0; }
    }
    console.log(sum);
});
