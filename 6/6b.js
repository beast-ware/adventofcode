var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('6/DATA', 'utf8', function (err, contents) {    

    var initPoints = function(pointsRaw) {
        var points = {};
        points.largestX = 0;
        points.largestY = 0;
        points.coords = [];
        points.pointsRaw = {};
        for (var i=0; i<pointsRaw.length; i++) {
            var point = {};
            point.id = i;
            var p = pointsRaw[i].split(",");
            point.x = parseInt(p[0].trim());
            point.y = parseInt(p[1].trim());
            if (point.x > points.largestX) {
                points.largestX = point.x;
            }
            if (point.y > points.largestY) {
                points.largestY = point.y;
            }
            points.coords.push(point);
            point.count = 0;
            points.pointsRaw[point.x + "," + point.y] = point; 
        }
        points.isBoundry = function(x, y) {
            return (x === points.largestX-1 || y === points.largestY-1 || x == 0 || y == 0)
        }
        points.largestX = points.largestX + 1;
        points.largestY = points.largestY + 1;
        return points;
    }

    var calclateArea = function(points) {
        var squareCount = 0;    
        for (var y=0; y<points.largestY; y++) {
            for (var x=0; x<points.largestX; x++) {
                squareCount += isInArea(x, y, points);
            }
        }
        return squareCount;
    }

    var manhattanDistance = function(x, y, point) {
        return Math.abs(point.x-x) + Math.abs(point.y-y);
    }
    
    var MAXDISTANCE = 10000;
    var isInArea = function(x, y, pointsObj) {
        var points = pointsObj.coords;        
        var sum = 0;
        for (var i=0; i<points.length; i++) {
            var m = manhattanDistance(x, y, points[i])
            sum += m;
            if (sum > MAXDISTANCE) { return 0; }            
        } 
        if (sum < MAXDISTANCE){
            return 1;
        } 
        return 0;
    }

    var c = splitLines(contents);
    
    var points = initPoints(c);

    var total  = calclateArea(points);

    console.log(total);
})
