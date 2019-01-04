var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('2/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);

    // either returns false or the diff string, 
    //   which is all the letters that are the same
    // haha, returns either a string or a bool.
    var isDiffByOne = function (s1, s2) {
        var r = "";
        var diffCount = 0;
        for (var i = 0; i < s1.length; i++) {
            var a = s1.trim().charAt(i);
            var b = s2.trim().charAt(i);
            if (a === b) {
                r += b;
            } else {
                diffCount++;
            }
            if (diffCount > 1) {
                r = false;
                break;
            } 
        }
        return r;
    }

    var findMatch = function(serials) {
        var top = serials.shift();
        var result;
        serials.some(function (s, i) {
            result = isDiffByOne(top, s);
            if (result) {
                return true;
            } else {
                return false;
            }
        });
        if (!result && serials.length > 1) {
            return findMatch(serials);
        } else {
            return result;
        }
    }
    
    var r = findMatch(c)

    console.log(r);
   
});

 