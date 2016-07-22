var express = require('express');
var app = express();

app.use(express.static(__dirname));

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
