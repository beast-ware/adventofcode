var fs = require('fs');
const splitLines = require('split-lines');


fs.readFile('DATA', 'utf8', function (err, contents) {
  var c = splitLines(contents);

  var sum = 0;
  for (var i = 0; i < c.length; i++) {
    sum += parseInt(c[i]);
  }
  console.log(sum);
});

console.log('after calling readFile');