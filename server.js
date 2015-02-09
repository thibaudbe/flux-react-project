
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
  // res.send('Hello World!');
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
})

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);

});