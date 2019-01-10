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
            point.x = p[0];
            point.y = p[1];
            if (point.x > points.largestX) {
                points.largestX = point.x;
            }
            if (point.y > points.largestY) {
                points.largestY = point.y;
            }
            points.coords.push(point);
            points.pointsRaw[pointsRaw[i]] = point; 
        }
        points.isBoundry = function(x, y) {
            return (x === points.largestX || y === points.largestY || x == 0 || y == 0)
        }
        return points;
    }

    var copyObject = function(obj) {
        var c = {};
        for (var key in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(key)) continue;
            c[key] = obj[key];
        }
        return c;
    }

    var processPoints = function(points) {
        var grid ={};
        grid.values = [];
        grid.notInfinitePoints = copyObject(points.pointsRaw);

        for (var x=0; x<points.largestX; x++) {
            for (var y=0; y<points.largestY; y++) {
                var g = {};
                if (points.pointsRaw[x + "," + y]) {
                    g.type = "prime";
                    g.point = points.pointsRaw[x + "," + y];
                    g.point.isInfinite = points.isBoundry(x, y);  
                    g.displayVal = 'P';
                } else {
                    g.type = "calc";
                    g.closestPoints = closestPrimes(x, y, points);
                    g.isMultiple = g.closestPoints.points.length > 1;
                    for (var i=0;i<g.closestPoints.points.length; i++) {
                        var isInfinite = points.isBoundry(x, y);
                        if (!g.closestPoints.points[i].isInfinite) {
                            g.closestPoints.points[i].isInfinite = isInfinite
                        } 
                        if (isInfinite) {
                            grid.notInfinitePoints[x + "," + y] = null;
                        }
                    }
                    if (g.isMultiple) { 
                        g.displayVal = "."; 
                    } else {
                        g.displayVal = g.closestPoints.points[0].x + "," + g.closestPoints.points[0].y; 
                    }
                    
                }
                grid.values.push(g);
            }
        }
        grid.points = points;
        return grid;
    }

    var manhattanDistance = function(x, y, point) {
        return Math.abs(x-point.x) + Math.abs(y-point.y);
    }
    
    var closestPrimes = function(x, y, pointsObj) {
        var points = pointsObj.coords;
        var closest = { distance:false, points:[] };

        for (var i=0; i<points.length; i++) {
            var m = manhattanDistance(x, y, points[i])
            if (!closest.distance) { 
                closest.distance = m;
                closest.points.push(points[i]);
            } else if (m < closest.distance){
                closest.distance = m;
                closest.points = [ points[i] ];
            } else if (m === closest.distance) {
                closest.points.push(points[i]);
            }
        } 

     /*   if (closest.points > 1) {
            return false;
        } */
        return closest;
    }

    var c = splitLines(contents);
    
    var points = initPoints(c);

    var grid = processPoints(points);

    var s = "";
    for (var i=0; i < grid.values.length; i++) {
        s = s + " " + grid.values[i].displayVal;
        
        if (i % grid.points.largestX === grid.points.largestX-1) {
            console.log(s);
        }
    } 
         
    //console.log(grid);
   
});

 