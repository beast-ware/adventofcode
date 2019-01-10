var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('5/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
   
   var reduceRemoveChar = function(c, removeChar) {
        var i = 0;
        var oppositePolarity = function(a,b) {
            return (a != b && a.toUpperCase() === b.toUpperCase());
        }
        var reduce = function(a, b, removeChar) {
            if (a.toUpperCase() === removeChar && b.toUpperCase() === removeChar) {
                s.splice(i,2);
                if (i > 0) {  i--; }
            } else if (a.toUpperCase() === removeChar) {
                s.splice(i,1);
            } else if (b.toUpperCase() === removeChar) {
                s.splice(i+1,1);
            } else if (oppositePolarity(a, b)) {                                                                                                                                       
                s.splice(i, 2);
                if (i > 0) {  i--; }
            } else {
                i++;
            }
        }
        var s = c[0].split(""); // convert to char array for easier splicing
        while (i < s.length-1) {
            reduce(s[i], s[i+1], removeChar);
       }
       return s;
    }

    var smallest;
    for (i = 0; i < 26; i++) {
        var count = reduceRemoveChar(c, (i+10).toString(36).toUpperCase()).length; 
        if (!smallest) { smallest = count; }
        else if (count < smallest) {
            smallest = count;
        }
    }
    console.log(smallest);
   
});

 