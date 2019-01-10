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

    var initGrid = function(x, y){
        var grid = Array(x).fill([]);
        grid.forEach(function(e, i) {
            grid[i] = Array(y).fill({});
        })
        return grid;
    }

    var processPoints = function(points) {
        var grid = initGrid(points.largestX, points.largestY);
        
        for (var y=0; y<points.largestY; y++) {
            for (var x=0; x<points.largestX; x++) {
                grid[x][y] = closestPrimes(x, y, points);
            }
        }
        return grid;
    }

    var manhattanDistance = function(x, y, point) {
        return Math.abs(point.x-x) + Math.abs(point.y-y);
    }
    
    var closestPrimes = function(x, y, pointsObj) {
        var points = pointsObj.coords;
        var closest = { distance:false, points:[] };

        for (var i=0; i<points.length; i++) {
            var m = manhattanDistance(x, y, points[i])
            if (m === 0){
                closest.distance = 0;
                closest.points = [];
                break;
            } else if (!closest.distance) { 
                closest.distance = m;
                closest.points.push(points[i]);
            } else if (m < closest.distance){
                closest.distance = m;
                closest.points = [ points[i] ];
            } else if (m === closest.distance) {
                closest.points.push(points[i]);
            }
        } 

        if (closest.points.length === 0) {
            closest.displayVal = "P";
            pointsObj.pointsRaw[x + "," + y].count++;
        } else if (closest.points.length > 1) {
            closest.displayVal = ".";
        } else if (closest.points.length === 1) {
            closest.displayVal = closest.points[0].id;
            if (pointsObj.isBoundry(x, y)) {
                pointsObj.pointsRaw[closest.points[0].x + "," + closest.points[0].y].isInfinite = true;
            }
            pointsObj.pointsRaw[closest.points[0].x + "," + closest.points[0].y].count++;
        }
        return closest;
    }

    var c = splitLines(contents);
    
    var points = initPoints(c);

    var grid = processPoints(points);

    var vals = points.pointsRaw;
    var largestCount = 0;
    for (var key in vals) {
        // skip loop if the property is from prototype
        if (!vals.hasOwnProperty(key)) continue;
        if (!vals[key].isInfinite && vals[key].count > largestCount) {
            largestCount = vals[key].count;
        }
    }
    console.log(largestCount);

    /* var s = "";
 
    for (var y=0; y<points.largestY; y++) {
        for (var x=0; x<points.largestX; x++) {
          s = s + "," + grid[x][y].displayVal;
        }
        console.log(s);
        s = "";
    }  */
           
});

 