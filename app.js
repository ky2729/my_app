var express = require('express');
var path = require('path');

var app = express();

//ddd
app.use(express.static(path.join(__dirname,'/public')));


app.listen(4000, function(){ console.log("Server On!");});
