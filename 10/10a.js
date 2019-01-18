var express = require('express');
var app = express();
app.use('/', express.static('10/web')); // ← adjust
app.listen(3001, function() { console.log('listening'); });