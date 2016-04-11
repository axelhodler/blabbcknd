var express = require('express');
var app = express();
var rest_api_gateway = require('../rest_api_gateway');

app.get('/ledgers', function (req, res) {
  rest_api_gateway.getAll(req, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});