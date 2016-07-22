var express = require('express');
var app = express();
// var socket = require("socket.io");

app.use(express.static(__dirname));
// var server = app.listen(3000);
// var io = socket.listen(server);
// app.get('/data', function (req, res) {
//   res.send('Hello World!');
// });
// 
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('TheInformation_DataStoryteller_02222016-3.csv', function (req, res, next) {

  var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile('TheInformation_DataStoryteller_02222016-3.csv', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', 'TheInformation_DataStoryteller_02222016-3.csv');
    }
  });

});

// app.get('/data', function (req, res) {
//   res.send('TheInformation_DataStoryteller_02222016-3.csv');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });