var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('5/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
   
    var s = c[0].split(""); // convert to char array for easier splicing
   
    var i = 0;
    var oppositePolarity = function(a,b) {
        return (a != b && a.toUpperCase() === b.toUpperCase());
    }
    var reduce = function(a, b) {
        if (oppositePolarity(a, b)) {
            s.splice(i, 2);
            if (i > 0) {  i--; }
        } else {
            i++;
        }
    }
    while (i < s.length-1) {
         reduce(s[i], s[i+1]);
    }

    console.log(s.length);
   
});

 