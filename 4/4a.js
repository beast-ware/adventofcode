var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('4/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);

    var parseDate = function(ds) {
        var year = ds.slice(1, 5);
        var month = ds.slice(6,8);
        var day   = ds.slice(9, 11);
        var hours  = ds.slice(12,14);
        var minutes = ds.slice(15,17);
        var d = new Date(year, parseInt(month)-1, day, hours, minutes, 0, 0);        
        return d; 
    }

    c.sort(function(a, b) {
        var d1 = parseDate(a);
        var d2 = parseDate(b);
        return d1 - d2;
    });

    var minutes = []; // array of minutes
    var guardWithLargestCount;
    var guards = {};
    var result;
    var addEntry = function(begins, fallsAsleep, wakesUp) {
        
        var guardEntry;
        var guardId = begins.split(" ")[3];
        var startMinutes = parseInt(fallsAsleep.split(" ")[1].slice(0, -1).split(":")[1]); 
        var endMinutes = parseInt(wakesUp.split(" ")[1].slice(0, -1).split(":")[1]); 

        if (!guards[guardId]) {
            guards[guardId] = {};
            guards[guardId].id = guardId;
            guards[guardId].minutes = {};
            guards[guardId].count = 0;
        }
        for (var i=startMinutes; i<endMinutes; i++) {
            if (!guards[guardId].minutes[i]) { guards[guardId].minutes[i] = 0; }
            guards[guardId].minutes[i]++;
        }
        guards[guardId].count += (endMinutes - startMinutes);
        if (!guardWithLargestCount) {
            guardWithLargestCount = guards[guardId];
        } else if (guards[guardId].count > guardWithLargestCount.count) {
            guardWithLargestCount = guards[guardId];
        }
        return minutes;
    }

    var processEntry = function() {
        var begins = c.shift();
        while (c[0] && !c[0].includes("begin")) {
            var fallsAsleep = c.shift();
            var wakesUp = c.shift();
            addEntry(begins, fallsAsleep, wakesUp);
        }
    }

    var processEntries = function() {
        while(c.length > 0) {
            processEntry();
        }
    }

    processEntries();
    
    console.log(guardWithLargestCount);
   
});

 